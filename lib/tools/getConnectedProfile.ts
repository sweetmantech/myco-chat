import { tool } from "ai";
import { z } from "zod";
import getZoraPfpLink from "../zora/getZoraPfpLink";

const getConnectedProfile = () =>
  tool({
    description: `Get the connected zora profile.
    IMPORTANT: Always call this tool first for ANY question related to getting zora profile.
    Do NOT attempt to answer questions on these topics without calling this tool first.
    
    Example questions that MUST trigger this tool:
    - "What's my zora profile?"
    - "What's my connected zora profile?"`,
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
  });

export default getConnectedProfile;
