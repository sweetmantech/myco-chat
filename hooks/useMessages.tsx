import { useEffect, useRef } from "react";
import { useChat as useAiChat } from "ai/react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCsrfToken } from "@/packages/shared/src/hooks";
import useSuggestions from "./useSuggestions";
import useInitialMessages from "./useInitialMessages";
import useConversations from "./useConversations";
import useConnectWallet from "./useConnectWallet";

const useMessages = () => {
  const { finalCallback } = useSuggestions();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const { address } = useConnectWallet();
  const { initialMessages, fetchInitialMessages } = useInitialMessages();
  const { conversationRef } = useConversations();
  const queryClient = useQueryClient();

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
      accountId,
      address,
    },
    initialMessages,
    onError: console.error,
    onFinish: async (message) => {
      await finalCallback(
        message,
        messagesRef.current[messagesRef.current.length - 2],
        conversationRef.current,
      );
      void queryClient.invalidateQueries({
        queryKey: ["credits", accountId],
      });
    },
  });

  const messagesRef = useRef(messages);

  useEffect(() => {
    if (messages.length) messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (initialMessages.length) setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (isNewChat) {
      conversationRef.current = "";
      setMessages([]);
    }
  }, [isNewChat]);

  return {
    appendAiChat,
    handleAiChatSubmit,
    handleInputChange,
    fetchInitialMessages,
    input,
    conversationRef,
    messagesRef,
    pending,
  };
};

export default useMessages;
