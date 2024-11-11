// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toolSystemMessage = (context: any, question: any, toolName: string) => {
  if (toolName === "getConnectedProfile")
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}

    Analyze the provided context and answer the question comprehensively. Follow these guidelines:
    - Start your answer with "Here is your Zora profile:"
    - Include the profile picture, name, followers, following, and profile URL.`;

  if (toolName === "createToken")
    return `
      Context: ${JSON.stringify(context)}
      Question: ${question}
  
      Analyze the provided context and answer the question comprehensively. Follow these guidelines:
      - Start your answer with "Here is newly created token:"
      - Include the rounded token image, name, and onzora link.`;

  return "";
};

export default toolSystemMessage;
