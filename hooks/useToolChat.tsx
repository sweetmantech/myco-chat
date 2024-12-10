import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useChatProvider } from "@/providers/ChatProvider";

const useTokenCreation = (question?: string, toolName?: string) => {
  const { finalCallback, clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const [beginCall, setBeginCall] = useState(false);

  const {
    messages,
    append,
    isLoading: loading,
  } = useChat({
    api: "/api/tool_call",
    body: {
      question,
      toolName,
      context: {
        // Token creation specific context can be added here
        // For example: image, title, collectionAddress, etc.
      },
    },
    onError: console.error,
    onFinish: async (message) => {
      await finalCallback(
        message,
        {
          id: uuidV4(),
          content: question as string,
          role: "user" as const,
        } as Message,
        conversationId as string,
      );
      await clearQuery();
    },
  });

  const answer = messages.filter(
    (message: Message) => message.role === "assistant",
  )?.[0]?.content;

  useEffect(() => {
    const initTokenCreation = async () => {
      await append({
        id: uuidV4(),
        content: question as string,
        role: "user" as const,
      } as Message);
      setBeginCall(false);
    };

    if (!beginCall || !question) return;
    initTokenCreation();
  }, [beginCall, question]);

  return {
    messages,
    append,
    loading,
    answer,
    setBeginCall,
  };
};

export default useTokenCreation;
