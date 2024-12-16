/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import useSuggestions from "./useSuggestions";
import { useChat as useAiChat } from "ai/react";
import { useCsrfToken } from "@/packages/shared/src/hooks";
import useInitialMessages from "./useInitialMessages";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import usePrivyAddress from "./usePrivyAddress";
import { CreateTokenResponse } from "@/lib/toolResponse.types";

const useMessages = () => {
  const { finalCallback, suggestions, setCurrentQuestion } = useSuggestions();
  const csrfToken = useCsrfToken();
  const { initialMessages, fetchInitialMessages } = useInitialMessages();
  const { conversationRef } = useConversationsProvider();
  const queryClient = useQueryClient();
  const { address } = usePrivyAddress();
  const [toolCall, setToolCall] = useState<any>(null);
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const pathname = usePathname();
  const isNewChat = pathname === "/";

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleAiChatSubmit,
    append: appendAiChat,
    isLoading: pending,
    setMessages,
  } = useAiChat({
    api: `/api/tool_call`,
    headers: {
      "X-CSRF-Token": csrfToken,
      'Content-Type': 'application/json',
    },
    body: {
      accountId,
      address,
      conversationId: conversationRef.current,
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
    initialMessages,
    onError: console.error,
    onToolCall: ({ toolCall }) => {
      setToolCall(toolCall as any);
    },
    onFinish: async (message) => {
      setToolCall(null);
      await finalCallback(
        message,
        messagesRef.current[messagesRef.current.length - 2],
        conversationRef.current,
      );
      void queryClient.invalidateQueries({
        queryKey: ["credits", address],
      });
    },
  });

  const messagesRef = useRef(messages);

  useEffect(() => {
    if (messages.length) messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (initialMessages.length) setMessages(initialMessages);
  }, [initialMessages, setMessages]);

  useEffect(() => {
    if (isNewChat) {
      conversationRef.current = "";
      setMessages([]);
    }
  }, [isNewChat, setMessages]);

  return {
    conversationRef,
    appendAiChat,
    handleAiChatSubmit,
    handleInputChange,
    input,
    messagesRef,
    pending,
    fetchInitialMessages,
    toolCall,
    suggestions,
    setCurrentQuestion,
    finalCallback,
  };
};

export default useMessages;
