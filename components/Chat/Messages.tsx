import { useEffect, useRef } from "react";
import { Message as AIMessage } from "ai";
import { useChatProvider } from "@/providers/ChatProvider";
import Thinking from "./Thinking";
import Message from "./Message";
import { ToolCallProvider } from "@/providers/ToolCallProvider";

const Messages = () => {
  const { messages, pending } = useChatProvider();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  });

  return (
    <div className="w-full max-w-xl mt-4 mb-2 overflow-y-auto">
      <div className="space-y-4 flex flex-col">
        {messages.map((message: AIMessage, index: number) => (
          <ToolCallProvider key={index} message={message}>
            <Message message={message} />
          </ToolCallProvider>
        ))}
        {pending && <Thinking />}
      </div>
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
