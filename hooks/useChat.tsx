import { useQueryClient } from "@tanstack/react-query";
import { Message, useChat as useAiChat } from "ai/react";
import { useAccount } from "wagmi";
import { useCsrfToken } from "@/packages/shared/src/hooks";
import useConnectWallet from "./useConnectWallet";
import useInitialMessages from "./useInitialMessages";
import useSuggestions from "./useSuggestions";

const useChat = () => {
  const { connectWallet } = useConnectWallet();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { initialMessages } = useInitialMessages();
  const { finalCallback, suggestions, setCurrentQuestion } = useSuggestions();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleAiChatSubmit,
    append: appendAiChat,
    isLoading: pending,
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
      await finalCallback(message, messages[messages.length - 2]);
      void queryClient.invalidateQueries({
        queryKey: ["credits", accountId],
      });
    },
  });

  const isPrepared = () => {
    if (!address) {
      connectWallet();
      return false;
    }
    return true;
  };

  const append = async (message: Message) => {
    if (!isPrepared()) return;
    setCurrentQuestion(message);
    await appendAiChat(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    handleAiChatSubmit(e);
    setCurrentQuestion({
      content: input,
      role: "user",
      id: `${address}-${Date.now().toLocaleString()}`,
    });
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    suggestions,
    finalCallback,
    pending,
  };
};

export default useChat;
