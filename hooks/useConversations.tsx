import { Address } from "viem";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Conversation } from "@/lib/conversation.types";
import getConversations from "@/lib/stack/getConversations";
import useConnectWallet from "./useConnectWallet";

const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { address } = useConnectWallet();
  const { conversation } = useParams();
  const conversationRef = useRef(conversation as string);

  useEffect(() => {
    conversationRef.current = conversation as string;
  }, [conversation]);

  useEffect(() => {
    if (address) {
      fetchConversations(address);
    }
  }, [address]);

  const fetchConversations = async (walletAddress: Address) => {
    try {
      const data = await getConversations(walletAddress);
      setConversations(data);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return [];
    }
  };

  return {
    fetchConversations,
    conversations,
    conversationRef,
    conversationId: conversation,
  };
};

export default useConversations;
