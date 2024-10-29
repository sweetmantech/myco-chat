import 'server-only';

import { Address } from 'viem';
import { z } from 'zod';
import getContext from '../getContext';
import { AI_MODEL } from '../consts';
import getZoraPfpLink from '../zora/getZoraPfpLink';
import { tool } from 'ai';

export function createChatMessagesService() {
  return new ChatMessagesService();
}

class ChatMessagesService {
  constructor() {}

  async getChatSettings(chatReferenceId: string, address: Address) {
    const context = await this.fetchRelevantContext(address);
    const tools = this.fetchRelevantTools();

    const systemMessage = `You are a helpful assistant
Here is some relevant data to help you answer:
${context}

Please use this information to provide accurate and relevant responses and don't mention the data source in your response.`;

    return {
      maxTokens: 1111,
      systemMessage,
      model: AI_MODEL,
      temperature: 0.7,
      tools,
    };
  }

  private async fetchRelevantContext(address: Address = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38"): Promise<string> {
    try {
      const context = await getContext(address);

      return JSON.stringify(context, null, 2);
    } catch (error) {
      console.error('Error reading or parsing JSON files:', error);
      return '{}';
    }
  }

  private fetchRelevantTools() {
    try {
      return {
        getConnectedProfile: tool({
          description: "Get the connected profile for a coinbase smart wallet. Call this whenever you need to know the connected profile, for example when a customer asks 'What is my Zora profile'",
          parameters: z.object({
            address: z.string().describe("The connected coinbase smart wallet."),
          }),
          execute: async ({ address }) => {
            const response = await fetch(`https://api.myco.wtf/api/profile?address=${address}`)
            if (!response.ok) {
              return { error: "I couldn't find your profile." };
            }

            const data = await response.json();

            if (!data.zoraProfile) {
              return { error: "I couldn't find your profile." };
            }

            const content = {
              profilePicture: getZoraPfpLink(data.zoraProfile),
              name: data.zoraProfile.displayName || "Unknown",
              followers: data.zoraProfile.totalFollowers || 0,
              following: data.zoraProfile.totalFollowing || 0,
              profileUrl: `https://profile.myco.wtf/${data.zoraProfile.address}`,
            };
            return { content, role: "assistant" };
          },
        }),
      };
    } catch (error) {
      console.error("Error reading or parsing JSON files:", error);
      return {};
    }
  }
}


