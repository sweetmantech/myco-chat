/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useChatProvider } from "@/providers/ChatProvider";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { CreateTokenResponse } from "@/lib/toolResponse.types";
import usePrivyAddress from "./usePrivyAddress";
import { Tools } from "@/lib/Tool";

interface ToolContext {
  imageUri?: string;
  animationUri?: string;
  mimeType?: string;
  title?: string;
  collectionAddress?: string;
  status?: CreateTokenResponse;
  [key: string]: any;
}

const useToolChat = (question?: string, toolName?: string) => {
  const { finalCallback, clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const [beginCall, setBeginCall] = useState(false);
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider();
  const { address } = usePrivyAddress();

  // Build context based on tool type
  const context: ToolContext = toolName === Tools.createToken ? {
    imageUri,
    animationUri,
    mimeType,
    title: question,
    status: !imageUri 
      ? CreateTokenResponse.MISSING_IMAGE 
      : !question 
      ? CreateTokenResponse.MISSING_TITLE 
      : CreateTokenResponse.SIGN_TRANSACTION
  } : {};

  const {
    messages,
    append,
    isLoading: loading,
  } = useChat({
    api: "/api/tool_call",
    body: {
      question,
      toolName,
      address,
      context,
    },
    onError: console.error,
    onFinish: async (message) => {
      await finalCallback(
        message,
        {
          id: uuidV4(),
          content: question as string,
          role: "user" as const,
        } as Message,
        conversationId as string,
      );
      await clearQuery();
    },
  });

  const answer = messages.filter(
    (message: Message) => message.role === "assistant",
  )?.[0]?.content;

  useEffect(() => {
    const initToolCall = async () => {
      await append({
        id: uuidV4(),
        content: question as string,
        role: "user" as const,
      } as Message);
      setBeginCall(false);
    };

    if (!beginCall || !question) return;
    initToolCall();
  }, [beginCall, question, append]);

  return {
    messages,
    append,
    loading,
    answer,
    setBeginCall,
    context,
    toolName,
  };
};

export default useToolChat;
