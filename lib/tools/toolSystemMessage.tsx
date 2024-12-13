/* eslint-disable @typescript-eslint/no-explicit-any */
import instructions from "@/evals/scripts/instructions.json";
import { Tools } from "@/lib/Tool";

const toolSystemMessage = (context: any, question: any, toolName: string) => {
  if (toolName === Tools.createToken) {
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}
    ${instructions.createToken}
    `;
  }

  return instructions.createToken;
};

export default toolSystemMessage;
