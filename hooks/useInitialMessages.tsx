import { Message } from "ai";
import { Address, getAddress } from "viem";
import getStackClient from "@/lib/stack/getStackClient";
import { useEffect, useState } from "react";
import { CHAT_POINT_SYSTEM_ID, MESSAGE_SENT_EVENT } from "@/lib/consts";
import { useAccount } from "wagmi";

const useInitialMessages = () => {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const { address } = useAccount();

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

  return { initialMessages };
};

export default useInitialMessages;
