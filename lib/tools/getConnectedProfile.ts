import { tool } from "ai";
import { z } from "zod";
import getZoraPfpLink from "../zora/getZoraPfpLink";
import { API_APP_URL } from "../consts";

const getConnectedProfile = (question: string) =>
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
      try {
        const response = await fetch(`${API_APP_URL}/api/profile?address=${address}`)
        if (!response.ok) {
          return {
            context: {
              error: "I couldn't find your profile."
            },
            question,
          };
        }

        const data = await response.json();

        if (!data.zoraProfile) {
          return {
            context: {
              error: "I couldn't find your profile."
            },
            question,
          };
        }

        const profile = {
          profilePicture: getZoraPfpLink(data),
          name: data.zoraProfile.displayName || "Unknown",
          followers: data.zoraProfile.totalFollowers || 0,
          following: data.zoraProfile.totalFollowing || 0,
          profileUrl: `https://profile.myco.wtf/${data.zoraProfile.address}`,
        };
        return {
          context: profile,
          question,
        };
      } catch (error) {
        console.error(error)
        return {
          context: {
            error: "I couldn't find your profile."
          },
          question,
        };
      }
    },
  });

export default getConnectedProfile;
