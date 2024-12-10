import instructions from "@/evals/scripts/instructions.json";

const toolSystemMessage = (context: { status?: string }, question: string, toolName: string) => {
  if (toolName === "createToken") {
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}
    ${instructions.create_token}
    `;
  }

  return "";
};

export default toolSystemMessage;
