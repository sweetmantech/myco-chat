/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address } from "viem";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Conversation } from "@/lib/conversation.types";
import getConversations from "@/lib/stack/getConversations";
import usePrivyAddress from "./usePrivyAddress";
import trackChatTitle from "@/lib/stack/trackChatTitle";



let timer: any = null;
let streamedIndex = 1;
const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { address } = usePrivyAddress();
  const { conversation } = useParams();
  const conversationRef = useRef(conversation as string);
  const [streamingTitle, setStreamingTitle] = useState("");
  const [streaming, setStreaming] = useState(false);
  useEffect(() => {
    if (address) {
      fetchConversations(address);
    }
  }, [address]);
  const trackNewTitle = async (titlemetadata: any, conversationId: string) => {
    await trackChatTitle(
      address as Address,
      titlemetadata,
      conversationId,
    );
    clearInterval(timer);
    streamedIndex = 1;
    timer = setInterval(() => {
      if (streamedIndex === titlemetadata.title.length + 1) {
        clearInterval(timer);
        return;
      }
      setStreamingTitle(titlemetadata.title.slice(0, streamedIndex));
      streamedIndex++;
    }, 50);
    setStreaming(true);
    await fetchConversations(address as Address);
    setStreaming(false);
  };

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
    trackNewTitle,
    streaming,
    streamingTitle,
  };
};

export default useConversations;
