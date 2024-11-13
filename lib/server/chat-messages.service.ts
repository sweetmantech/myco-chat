import 'server-only';

import { Address } from 'viem';
import getContext from '../getContext';
import { AI_MODEL } from '../consts';
import getConnectedProfile from '../tools/getConnectedProfile';
import createToken from '../tools/createToken';

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
        getConnectedProfile: getConnectedProfile(),
      };
    } catch (error) {
      console.error("Error reading or parsing JSON files:", error);
      return {};
    }
  }
}


