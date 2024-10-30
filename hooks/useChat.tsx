import { Message } from "ai";
import { useChat as useAiChat } from "ai/react";
import { useAccount } from "wagmi";
import useConnectWallet from "./useConnectWallet";
import useSuggestions from "./useSuggestions";
import { useQueryClient } from "@tanstack/react-query";
import { useCsrfToken } from "@/packages/shared/src/hooks";
import useInitialMessages from "./useInitialMessages";

const useChat = () => {
  const { connectWallet } = useConnectWallet();
  const { address } = useAccount();
  const { finalCallback, suggestions, setCurrentQuestion } = useSuggestions();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const queryClient = useQueryClient();
  const { initialMessages } = useInitialMessages();

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
      await finalCallback(
        message,
        messages[messages.length - 2],
      );
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
    setCurrentQuestion({
      content: input,
      role: "user",
      id: `${address}-${Date.now()}`,
    });
    handleAiChatSubmit(e);
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
