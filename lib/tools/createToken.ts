import { tool } from "ai";
import { z } from "zod";
import { CreateTokenResponse } from "../toolResponse.types";

const createToken = (question: string) => tool({
  description: `Create a new token.
    IMPORTANT: Always call this tool first for ANY question related to creating a new token.
    Do NOT attempt to answer questions on these topics without calling this tool first.
    
    Example questions that MUST trigger this tool:
    - "Create a new token."
    - "I wanna create a new token."
    - "Create"`,
  parameters: z.object({
    address: z.string().describe("The creator wallet address."),
    image: z.string().describe("The image to create the token with."),
    animation: z.string().optional().describe("The audio, video or other media to create the token with."),
    title: z.string().optional().describe("The title of the token."),
    collectionAddress: z.string().optional().describe("The contract address of the collection."),
    mimeType: z.string().optional().describe("The type of media."),
  }),
  execute: async ({ image, animation, title, collectionAddress, mimeType }) => {    
    if (animation && !image) {
      return {
        context: {
          status: CreateTokenResponse.MISSING_THUMBNAIL,
          answer: "Please provide a Thumbnail to proceed.",
        },
        question,
      };
    }

    if (!image || !mimeType) {
      return {
        context: {
          status: CreateTokenResponse.MISSING_IMAGE,
          answer: "Please provide a image to proceed.",
        },
        question,
      };
    }

    if (!title) {
      return {
        context: {
          status: CreateTokenResponse.MISSING_TITLE,
          answer: "Please provide a title.",
        },
        question,
      };
    }

    if (!collectionAddress) {
      return {
        context: {
          status: CreateTokenResponse.MISSING_COLLECTION,
          answer: "Please select a collection.",
        },
        question,
      };
    }

    return {
      context: {
        status: CreateTokenResponse.SIGN_TRANSACTION,
        answer: "Please sign a transaction.",
      },
      question,
    };
  },
});

export default createToken;
