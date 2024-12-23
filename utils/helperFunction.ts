// Add types
interface ToolInvocation {
  result: {
    context: {
      status: string;
      answer?: string;
    };
  };
}

export interface Message {
  role: string;
  toolInvocations?: ToolInvocation[];
}

export function isImageMissing(lastMessage: Message): boolean {
  return (lastMessage?.role === "assistant" &&
    lastMessage?.toolInvocations &&
    lastMessage.toolInvocations.length > 0 &&
    "result" in lastMessage.toolInvocations[0] &&
    lastMessage.toolInvocations[0].result.context.status ===
      "MISSING_IMAGE") as boolean;
}

export function getMissingImageAnswer(lastMessage: Message): string {
  return (lastMessage?.role === "assistant" &&
    lastMessage?.toolInvocations &&
    lastMessage.toolInvocations.length > 0 &&
    "result" in lastMessage.toolInvocations[0] &&
    lastMessage.toolInvocations[0].result.context.answer) as string;
}
