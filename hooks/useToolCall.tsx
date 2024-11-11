import { Message } from "ai";
import { useEffect, useState } from "react";
import useToolChat from "./useToolChat";
import useToolCallParams from "./useToolCallParams";

const useToolCall = (message: Message) => {
  console.log(message)
  const [isCalled, setIsCalled] = useState(false);
  const { toolName, context, question } = useToolCallParams(message);
  const { answer, loading } = useToolChat(question, context, toolName);

  useEffect(() => {
    const init = async () => {
      const isAssistant = message.role === "assistant";
      if (!isAssistant) return;
      if (isCalled) return;
      setIsCalled(true);
    };

    if (!context || !question) return;
    init();
  }, [question, context, toolName]);

  return {
    loading,
    answer,
    toolName,
    question,
    context,
  };
};

export default useToolCall;
