/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { useChatProvider } from "@/providers/ChatProvider";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { Tools } from "@/lib/Tool";

interface ToolContext {
  imageUri?: string;
  animationUri?: string;
  mimeType?: string;
  title?: string;
  collectionAddress?: string;
  status?: CreateTokenResponse;
  toolName?: string;
  [key: string]: any;
}

const useToolChat = (question?: string, toolName?: string) => {
  const { finalCallback, clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const [beginCall, setBeginCall] = useState(false);
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const hasInitialized = useRef(false);

  const context: ToolContext = {
    imageUri,
    animationUri,
    mimeType,
    title: question,
    status: !imageUri
      ? CreateTokenResponse.MISSING_IMAGE
      : !question
        ? CreateTokenResponse.MISSING_TITLE
        : CreateTokenResponse.SIGN_TRANSACTION,
    toolName: Tools.createToken
  };

  const {
    messages,
    append,
    isLoading: loading,
  } = useChat({
    api: "/api/tool_call",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      accountId,
      question,
      toolName,
      context,
      tools: {
        createToken: {
          description: "Create a new token with provided parameters",
          parameters: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: Object.values(CreateTokenResponse)
              }
            },
            required: ["status"]
          }
        }
      }
    },
    onError: (error) => {
      console.error('Tool chat error:', error);
    },
    onFinish: async (message) => {
      if (!hasInitialized.current) {
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
        hasInitialized.current = true;
      }
    },
  });

  const answer = messages.filter(
    (message: Message) => message.role === "assistant",
  )?.[0]?.content;

  useEffect(() => {
    const initToolCall = async () => {
      if (!hasInitialized.current) {
        await append({
          id: uuidV4(),
          content: question as string,
          role: "user" as const,
        } as Message);
        setBeginCall(false);
        hasInitialized.current = true;
      }
    };

    if (!beginCall || !question) return;
    initToolCall();
  }, [beginCall, question, append]);

  // Reset initialization flag when tool or question changes
  useEffect(() => {
    hasInitialized.current = false;
  }, [toolName, question]);

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
