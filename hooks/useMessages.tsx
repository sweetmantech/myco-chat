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

const useMessages = () => {
  const { finalCallback, suggestions, setCurrentQuestion } = useSuggestions();
  const csrfToken = useCsrfToken();
  const { initialMessages, fetchInitialMessages } = useInitialMessages();
  const { conversationRef } = useConversationsProvider();
  const queryClient = useQueryClient();
  const { address } = usePrivyAddress();
  const [toolCall, setToolCall] = useState<any>(null);

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
    api: `/api/chat`,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: {
      address,
      conversationId: conversationRef.current,
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
