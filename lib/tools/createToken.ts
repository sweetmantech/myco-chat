import { tool } from "ai";
import { z } from "zod";

const createToken = () => tool({
  description: `Create a new token.
    IMPORTANT: Always call this tool first for ANY question related to creating token.
    Do NOT attempt to answer questions on these topics without calling this tool first.
    
    Example questions that MUST trigger this tool:
    - "Create a new token."
    - "I wanna create a new token."`,
  parameters: z.object({
    address: z.string().describe("The connected coinbase smart wallet."),
    media: z.string().optional().describe("The media to create the token with."),
    title: z.string().optional().describe("The title of the token."),
    contractAddress: z.string().optional().describe("The contract address of the collection."),
  }),
  execute: async ({ address, media, title, contractAddress }) => {
    if (!media) {
      return {
        content: "Please provide a media.",
        role: "assistant",
      };
    }

    if (!title) {
      return {
        content: "Please provide a title.",
        role: "assistant",
      };
    }

    if (!contractAddress) {
      return {
        content: "Please select a collection.",
        role: "assistant",
      };
    }

    return {
      content: "Token created successfully.",
      role: "assistant",
    };
  },
});

export default createToken;
