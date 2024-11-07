import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useChatProvider } from "@/providers/ChatProvider";
import useConnectWallet from "./useConnectWallet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useToolChat = (question?: string, context?: any, toolName?: string) => {
  const { address } = useConnectWallet();
  const { finalCallback, clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const toolCallContext = {
    ...(context !== null && { context }),
  };
  const [beginCall, setBeginCall] = useState(false);

  const {
    messages,
    append,
    isLoading: loading,
  } = useChat({
    api: "/api/tool",
    body: {
      question,
      context: toolCallContext,
      toolName,
    },
    onError: console.error,
    onFinish: async (message) => {
      await finalCallback(
        message,
        {
          id: `${address}-${Date.now()}`,
          content: question as string,
          role: "user",
        },
        conversationId as string,
      );
      await clearQuery();
    },
  });

  const answer = messages.filter(
    (message: Message) => message.role === "assistant",
  )?.[0]?.content;

  useEffect(() => {
    const init = async () => {
      await append({
        id: `${address}-${Date.now()}`,
        content: question as string,
        role: "user",
      });
      setBeginCall(false);
    };
    if (!beginCall || !question) return;
    init();
  }, [beginCall, question]);

  return {
    messages,
    append,
    loading,
    answer,
    setBeginCall,
  };
};

export default useToolChat;
