import { useCsrfToken } from "@/packages/shared/src/hooks";
import { Message, useChat as useAiChat } from "ai/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import useConnectWallet from "./useConnectWallet";
import trackNewMessage from "@/lib/stack/trackNewMessage";
import { Address, getAddress } from "viem";
import getStackClient from "@/lib/stack/getStackClient";
import { useEffect, useState } from "react";
import { CHAT_POINT_SYSTEM_ID, MESSAGE_SENT_EVENT } from "@/lib/consts";

const useChat = () => {
  const { connectWallet } = useConnectWallet();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (address) {
      fetchInitialMessages(address);
    }
  }, [address]);

  const fetchInitialMessages = async (walletAddress: Address) => {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    try {
      console.log("fetchInitialMessages", walletAddress);
      const events = await stackClient.getEvents({
        query: stackClient
          .eventsQuery()
          .where({
            eventType: MESSAGE_SENT_EVENT,
            associatedAccount: getAddress(walletAddress),
          })
          .offset(0)
          .build(),
      });
      console.log("events", events);
      const messages: Message[] = events.map((event) => ({
        id: event.metadata.id,
        content: event.metadata.content,
        role: event.metadata.role as Message["role"],
        createdAt: new Date(event.timestamp),
      }));
      console.log("messages", messages);
      messages.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
      setInitialMessages(messages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

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
    initialMessages,
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
    if (!isPrepared()) return;
    await appendAiChat(message);
    await trackNewMessage(address as Address, message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    handleAiChatSubmit(e);
    await trackNewMessage(address as Address, {
      content: input,
      role: "user",
      id: `${address}-${Date.now().toLocaleString()}`,
    });
  };

  return { messages, input, handleInputChange, handleSubmit, append };
};

export default useChat;
