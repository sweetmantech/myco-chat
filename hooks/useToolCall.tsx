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
            
      if (message.content.toLowerCase().includes('create') || message.content.toLowerCase().includes('token')) {
        const defaultContext = {
          status: CreateTokenResponse.MISSING_IMAGE
        };
        
        const newToolCallMessage = getToolCallMessage(Tools.createToken, defaultContext);
        if (newToolCallMessage) {
          await finalCallback(
            newToolCallMessage,
            { id: uuidV4(), content: question, role: "user" as const } as Message,
            conversationId as string,
          );
          return;
        }
        
        setBeginCall(true);
      }
    };
    
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
