import { useEffect } from "react";
import { Message } from "ai";
import { useChat as useAiChat } from "ai/react";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import { useCsrfToken } from "@/packages/shared/src/hooks";
import useConnectWallet from "./useConnectWallet";
import useSuggestions from "./useSuggestions";
import useConversations from "./useConversations";
import useInitialMessages from "./useInitialMessages";
import useProfileSearch from "./useProfileSearch";

const useChat = () => {
  const { address, connectWallet } = useConnectWallet();
  const { finalCallback, suggestions, setCurrentQuestion } = useSuggestions();
  const { push } = useRouter();
  const { initialMessages, fetchInitialMessages } = useInitialMessages();
  const { conversationId, conversationRef } = useConversations();
  const { profile } = useProfileSearch();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const lastQuestionOffset = 2;
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
        messages[messages.length - lastQuestionOffset],
      );
      void queryClient.invalidateQueries({
        queryKey: ["credits", accountId],
      });
    },
  });

  useEffect(() => {
    if (initialMessages.length) setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (isNewChat) {
      conversationRef.current = "";
      setMessages([]);
    }
  }, [isNewChat]);

  const goToNewConversation = async () => {
    if (conversationId) return;
    const newId = uuidV4();
    conversationRef.current = newId;
    push(`/${newId}`);
  };

  const isPrepared = () => {
    if (!address) {
      connectWallet();
      return false;
    }
    return true;
  };

  const clearQuery = async () => {
    if (!address) return;
    await fetchInitialMessages(address);
  };

  const append = async (message: Message) => {
    if (!isPrepared()) return;
    setCurrentQuestion(message);
    await goToNewConversation();
    appendAiChat(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setCurrentQuestion({
      content: input,
      role: "user",
      id: `${address}-${Date.now()}`,
    });
    await goToNewConversation();
    handleAiChatSubmit(e);
  };

  return {
    suggestions,
    messages,
    input,
    pending,
    profile,
    append,
    clearQuery,
    handleInputChange,
    handleSubmit,
    finalCallback,
  };
};

export default useChat;
