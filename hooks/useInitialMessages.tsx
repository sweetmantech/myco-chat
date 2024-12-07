import { Message } from "ai";
import { Address } from "viem";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getInitialMessages from "@/lib/stack/getInitialMessages";
import usePrivyAddress from "./usePrivyAddress";

const useInitialMessages = () => {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const address = usePrivyAddress();
  const { conversation: pathId } = useParams();

  useEffect(() => {
    if (address) {
      fetchInitialMessages(address);
    }
  }, [address]);

  const fetchInitialMessages = async (walletAddress: Address) => {
    try {
      const convId = pathId as string;
      if (!convId) return;
      const messages = await getInitialMessages(walletAddress, convId);
      setInitialMessages(messages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return;
    }
  };

  return { initialMessages, fetchInitialMessages };
};

export default useInitialMessages;
