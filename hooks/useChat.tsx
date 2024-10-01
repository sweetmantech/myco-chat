import { useCsrfToken } from "@/packages/shared/src/hooks";
import { useChat as useAiChat } from "ai/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import useConnectWallet from "./useConnectWallet";

const useChat = () => {
  const { connectWallet } = useConnectWallet();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleAiChatSubmit,
    append,
  } = useAiChat({
    api: `/api/chat`,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: {
      accountId,
      address,
    },
    onError: console.error,
    onFinish: () => {
      void queryClient.invalidateQueries({
        queryKey: ["credits", accountId],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!address) {
      e.preventDefault();
      await connectWallet();
      return;
    }
    handleAiChatSubmit(e);
  };

  return { messages, input, handleInputChange, handleSubmit, append };
};

export default useChat;
