// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toolSystemMessage = (context: any, question: any, toolName: string) => {
  if (toolName === "getConnectedProfile")
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}

    Analyze the provided context and answer the question comprehensively. Follow these guidelines:
    - Start your answer with "Here is your Zora profile:"
    - Include the profile picture, name, followers, following, and profile URL.`;
  
  return "";
};

export default toolSystemMessage;
