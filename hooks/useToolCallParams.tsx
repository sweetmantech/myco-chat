import { Tools } from "@/lib/Tool";
import { Message } from "ai";

const useToolCallParams = (message: Message) => {
  console.log('Message in useToolCallParams:', message);
  const toolInvocations = [...(message.toolInvocations || [])];
  console.log('Tool invocations:', toolInvocations);
  const toolInvocationResult = toolInvocations?.filter(
    (toolInvocation) => toolInvocation.state === "result",
  )?.[0];
  console.log('Tool invocation result:', toolInvocationResult);
  
  const question = toolInvocationResult?.result?.question || message.content;
  const context = toolInvocationResult?.result?.context || {};
  const toolName = toolInvocationResult?.toolName || Tools.createToken;

  return {
    question,
    context,
    toolName,
  };
};

export default useToolCallParams;
