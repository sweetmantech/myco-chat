/* eslint-disable @typescript-eslint/no-explicit-any */
import instructions from "@/evals/scripts/instructions.json";
import { Tools } from "@/lib/Tool";

const toolSystemMessage = (context: any, question: any, toolName: string) => {
  if (toolName === Tools.createToken) {
    return `
    You are a token creation assistant. When a user expresses interest in creating a token or mentions anything about token creation, ALWAYS use the createToken tool.

    Specifically, use the createToken tool when:
    - User mentions "create a token", "make a token", "mint a token"
    - User asks about token creation process
    - User wants to start creating a token

    Current Context: ${JSON.stringify(context)}
    User Question: ${question}

    Available Tool: createToken
    - Use this tool to handle all token creation requests
    - The tool will guide through collecting: image, title, collection address
    - Always call this tool first for any token-related creation questions

    ${instructions.createToken}
    `;
  }

  return instructions.createToken;
};

export default toolSystemMessage;
