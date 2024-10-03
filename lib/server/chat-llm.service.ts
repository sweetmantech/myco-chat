import 'server-only';

import { SupabaseClient } from '@supabase/supabase-js';

import { openai } from '@ai-sdk/openai';
import { LanguageModelV1, StreamingTextResponse, generateText, streamText } from 'ai';
import { encodeChat } from 'gpt-tokenizer';
import { z } from 'zod';

import { createChatMessagesService } from './chat-messages.service';
import { Database } from '../database.types';
import { Address } from 'viem';
import trackNewMessage from '../stack/trackNewMessage';

export const ChatMessagesSchema = z.object({
  messages: z.array(
    z.object({
      content: z.string(),
      role: z.enum(['user', 'assistant']),
    }),
  ),
});

export const StreamResponseSchema = ChatMessagesSchema.extend({
  accountId: z.string().uuid(),
  address: z.string().optional(),
});

/**
 * @name createChatLLMService
 * @description Create a new instance of the ChatLLMService.
 * @param client
 * @param adminClient
 */
export function createChatLLMService(
  client: SupabaseClient<Database>,
  adminClient: SupabaseClient<Database>,
) {
  return new ChatLLMService(client, adminClient);
}

/**
 * @name ChatLLMService
 * @description Chat service that uses the LLM model to generate responses.
 */
class ChatLLMService {
  constructor(
    private readonly client: SupabaseClient<Database>,
    private readonly adminClient: SupabaseClient<Database>,
  ) {}

  /**
   * @name streamResponse
   * @description Stream a response to the user and store the messages in the database.
   */
  async streamResponse(
    { messages, accountId, address }: z.infer<typeof StreamResponseSchema>,
    referenceId: string,
  ) {
    // use a normal service instance using the current user RLS
    const chatMessagesService = createChatMessagesService(this.adminClient);

    // get the last message
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      throw new Error('No messages provided');
    }

    // // make sure the user has enough credits
    // await this.assertEnoughCredits(accountId);

    // retrieve the chat settings
    const settings = await chatMessagesService.getChatSettings(referenceId, address as Address);
    const systemMessage = settings.systemMessage;
    const maxTokens = settings.maxTokens;

    // we need to limit the history length so not to exceed the max tokens of the model
    // let's assume for simplicity that all models have a max tokens of 4096
    // so we need to make sure that the history doesn't exceed output length + system message length
    const maxModelTokens = 4096;

    const maxHistoryLength = maxModelTokens - systemMessage.length - maxTokens;
    let decodedHistory = encodeChat(messages, 'gpt-3.5-turbo');

    if (decodedHistory.length > maxHistoryLength) {
      while (decodedHistory.length > maxHistoryLength) {
        messages.shift();
        decodedHistory = encodeChat(messages, 'gpt-3.5-turbo');
      }
    }

    // we use the openai model to generate a response
    const result = await streamText({
      model: openai(settings.model) as LanguageModelV1,
      system: settings.systemMessage,
      maxTokens: settings.maxTokens,
      temperature: settings.temperature,
      messages,
    });

    const stream = result.toAIStream({
      onFinal: async (completion) => {
        // get the chat ID using the reference ID
        const chatId =
          await chatMessagesService.getChatIdByReferenceId(referenceId);

        // store messages in the DB
        await this.storeMessages({
          accountId,
          chatId,
          messages: [
            lastMessage,
            {
              content: completion,
              role: 'assistant',
            },
          ],
        });

        await trackNewMessage(address as Address, {
          content: completion,
          role: "assistant",
          id: `${address}-${Date.now().toLocaleString()}`,
        });

        // deduct the credits from the user
        const tokensUsage = await result.usage;

        await this.adminClient.rpc('deduct_credits', {
          account_id: accountId,
          amount: tokensUsage.totalTokens,
        });
      },
    });

    return new StreamingTextResponse(stream);
  }

  /**
   * @name storeMessages
   * @description Store messages in the database.
   * @param params
   * @private
   */
  private async storeMessages(params: {
    accountId: string;
    chatId: number;
    messages: Array<{
      content: string;
      role: 'user' | 'assistant';
    }>;
  }) {
    // we need to create a new service instance using the admin client
    // because we do not allow inserting messages using RLS (locked down by default)
    const adminChatMessagesService = createChatMessagesService(
      this.adminClient,
    );

    // store messages in the DB
    await adminChatMessagesService.insertMessage({
      chatId: params.chatId,
      accountId: params.accountId,
      messages: params.messages,
    });
  }
}
