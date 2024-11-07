import { Address } from "viem";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getToolCallMessage = (address: Address, toolName: string | undefined, context: any) => {
  if (
    toolName === "createToken"
  )
    return {
      id: `${address}-${Date.now()}`,
      content: `Name: ${context.data.name}, ID: ${context.data.id}`,
      role: "assistant",
    };

  if (
    toolName === "createCampaign"
  )
    return {
      id: `${address}-${Date.now()}`,
      content: `Campaign Id: ${context.data.id}`,
      role: "assistant",
    };
  return null;
};

export default getToolCallMessage;
