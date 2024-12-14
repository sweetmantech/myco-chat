import { useChatProvider } from "@/providers/ChatProvider";
import { Message } from "ai";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useToolChat from "./useToolChat";
import { useParams } from "next/navigation";
import getToolCallMessage from "@/lib/getToolCallMessage";
import useToolCallParams from "./useToolCallParams";
import { Tools } from "@/lib/Tool";
import { CreateTokenResponse } from "@/lib/toolResponse.types";

const useToolCall = (message: Message) => {
  const { finalCallback } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const [isCalled, setIsCalled] = useState(false);
  const { toolName, context, question } = useToolCallParams(message);
  const { setBeginCall, answer, loading } = useToolChat(question, toolName);

  useEffect(() => {
    const init = async () => {
      const newToolCallMessage = getToolCallMessage(toolName, context);
      if (newToolCallMessage) {
        await finalCallback(
          newToolCallMessage,
          { id: uuidV4(), content: question, role: "user" as const } as Message,
          conversationId as string,
        );
        return;
      }

      const isAssistant = message.role === "assistant";
      if (!isAssistant || isCalled) return;
      setIsCalled(true);

      switch (toolName) {
        case Tools.createToken:
          const tokenStatus = context?.status;
          if (tokenStatus === CreateTokenResponse.MISSING_IMAGE ||
              tokenStatus === CreateTokenResponse.MISSING_TITLE ||
              tokenStatus === CreateTokenResponse.MISSING_COLLECTION ||
              tokenStatus === CreateTokenResponse.SIGN_TRANSACTION) {
            setBeginCall(true);
          }
          break;
        default:
          setBeginCall(true);
          break;
      }
    };
    
    if (!context || !question) return;
    init();
  }, [question, context, toolName, conversationId, finalCallback, isCalled, message, setBeginCall]);

  return {
    loading,
    answer,
    toolName,
    question,
    context,
  };
};

export default useToolCall;
