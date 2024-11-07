import { Message } from "ai";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useChatProvider } from "@/providers/ChatProvider";
import getToolCallMessage from "@/lib/getToolCallMessage";
import useToolCallParams from "./useToolCallParams";
import useConnectWallet from "./useConnectWallet";
import useToolChat from "./useToolChat";

const useToolCall = (message: Message) => {
  const { address } = useConnectWallet();
  const { finalCallback } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const [isCalled, setIsCalled] = useState(false);
  const { toolName, context, question } = useToolCallParams(message);
  const {
    setBeginCall,
    answer,
    loading,
  } = useToolChat(question, context, toolName);

  useEffect(() => {
    const init = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newToolCallMessage: any = getToolCallMessage(address!, toolName, context);
      if (newToolCallMessage) {
        finalCallback(
          newToolCallMessage,
          { id: `${address}-${Date.now()}`, content: question, role: "user" },
          conversationId as string,
        );
        return;
      }

      const isAssistant = message.role === "assistant";
      if (!isAssistant) return;
      if (isCalled) return;
      setIsCalled(true);
      if (
        toolName === "getConnectedProfile"
      ) {
        setBeginCall(true);
      }
    };

    if (!context || !question) return;
    init();
  }, [question, context, toolName]);

  return {
    loading,
    answer,
    toolName,
    question,
    context,
  };
};

export default useToolCall;
