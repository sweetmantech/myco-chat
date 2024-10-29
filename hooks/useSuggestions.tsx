import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Message } from "ai";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { SUGGESTIONS } from "@/lib/consts";
import trackNewMessage from "@/lib/stack/trackNewMessage";

const useSuggestions = () => {
  const { address } = useAccount();
  const [suggestions, setSuggestions] = useState(SUGGESTIONS);
  const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);
  const pathname = usePathname();
  const isNewChat = pathname === "/";

  useEffect(() => {
    if (isNewChat) setSuggestions(SUGGESTIONS);
  }, [isNewChat]);

  const finalCallback = async (
    message: Message,
    lastQuestion?: Message,
  ) => {
    const question = lastQuestion || currentQuestion;
    if (!message.content || !question) return;
    await trackNewMessage(address as Address, question);
    await trackNewMessage(
      address as Address,
      {
        content: message.content.replace(/[^a-zA-Z0-9\s,\.]/g, ""),
        role: message.role,
        id: `${address}-${Date.now().toLocaleString()}`,
      },
    );
    setCurrentQuestion(null);
    const response = await fetch(`/api/prompts?answer=${message.content}`);
    const data = await response.json();

    setSuggestions(data.questions);
  };

  return {
    finalCallback,
    suggestions,
    setCurrentQuestion,
    currentQuestion,
  };
};

export default useSuggestions;
