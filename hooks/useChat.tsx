import { useCsrfToken } from "@/packages/shared/src/hooks";
import { Message, useChat as useAiChat } from "ai/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import useConnectWallet from "./useConnectWallet";
import trackNewMessage from "@/lib/stack/trackNewMessage";
import { Address } from "viem";

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
    append: appendAiChat,
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

  const isPrepared = () => {
    if (!address) {
      connectWallet();
      return false;
    }
    return true;
  };

  const append = async (message: Message) => {
    console.log("HANDLE append", message);
    if (!isPrepared()) return;
    await appendAiChat(message);
    await trackNewMessage(address as Address, message.content);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLE SUBMIT", e.target);
    e.preventDefault();
    // if (!isPrepared()) return;
    // handleAiChatSubmit(e);
    // console.log(e.target);
  };

  return { messages, input, handleInputChange, handleSubmit, append };
};

export default useChat;
