import { Tools } from "@/lib/Tool";
import { Message } from "ai";

const useToolCallParams = (message: Message) => {
  const toolInvocations = [...(message?.toolInvocations || [])];

  const toolInvocationResult = toolInvocations?.filter(
    (toolInvocation) => toolInvocation?.state === "result",
  )?.[0];

  // if (!toolInvocationResult) {
  //   console.error('No valid tool invocation result found.');
  // }

  const question = toolInvocationResult?.result?.question || message?.content || "No question provided.";
  const context = toolInvocationResult?.result?.context || {};
  const toolName = toolInvocationResult?.toolName || Tools?.createToken || "Unknown Tool";

  if (!Tools || !Tools.createToken) {
    console.error('Tools.createToken is undefined. Check the import or definition of Tools.');
  }

  return {
    question,
    context,
    toolName,
  };
};

export default useToolCallParams;
