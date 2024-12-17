"use server"
import { AIState } from '@/lib/createAction.types';
import { UIState } from '@/lib/createAction.types';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import type { ReactNode } from 'react';
import { CoreMessage } from 'ai';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import MediaUpload from '@/components/MediaUpload';
import { openai } from '@ai-sdk/openai';


//We send this to the LLM to instantiate
const systemMessage = `
    You are a token creation assistant. When a user expresses interest in creating a token or mentions anything about token creation, ALWAYS use the createToken tool.

    Specifically, use the createToken tool when:
    - User mentions "create a token", "make a token", "mint a token"
    - User asks about token creation process
    - User wants to start creating a token

      Available Tool: createToken
    - Use this tool to handle all token creation requests
    - The tool will guide through collecting: image, title  , collection address
    - Always call this tool first for any token-related creation questions

    If the user wants anything urelated to token creation, you should chat with the user and annswer any questions that they may have

`

export async function sendMessage(message: string): Promise<{
  id: number,
  role: 'user' | 'assistant',
  display: ReactNode;
}> {

  const history = getMutableAIState<typeof AI>();
  history.update(
    [
      ...history.get(),
      {
        role: "user",
        content: message,
      }
    ]
  )

  //Tool calling
  const reply = await streamUI({
    model: openai('gpt-4-0125-preview'),
    messages: [
      {
        role: 'system',
        content: systemMessage,
        toolInvocations: []
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <div className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </div>
    ),
    text: ({ content, done }) => {
      if (done) history.done([...history.get(), { role: 'assistant', content }]);

      return <div>{content}</div>;
    },
    temperature: 0,
    tools: {
      createToken: {
        description:
          "Create a new token. Use this for any token creation related requests.",
        parameters: z.object({
          address: z.string().describe("The creator wallet address."),
          image: z.string().describe("The image to create the token with."),
          animation: z.string().optional().describe("The audio, video or other media to create the token with."),
          title: z.string().optional().describe("The title of the token."),
          collectionAddress: z.string().optional().describe("The contract address of the collection."),
          mimeType: z.string().optional().describe("The type of media."),
        }),

        //iterates over each yield and finally returns something
        generate: async function* (params: {
          address: string;
          image: string;
          animation?: string;
          title?: string;
          collectionAddress?: string;
          mimeType?: string;
        }) {
          yield <div className="items-center flex shrink-0 select-none justify-center">
            <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
          </div>;

          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: "createToken",
              content: 'Token created successfully',
            }
          ])

          return <MediaUpload />

        }
      }
    }
  })


  return {
    id: Date.now(),
    role: "assistant",
    display: reply.value,
  }
}


export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
})