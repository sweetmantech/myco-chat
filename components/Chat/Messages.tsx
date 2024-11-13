import { useEffect, useRef } from "react";
import { Message as AIMessage } from "ai";
import { useChatProvider } from "@/providers/ChatProvider";
import { ToolCallProvider } from "@/providers/ToolCallProvider";
import Thinking from "./Thinking";
import Message from "./Message";

const Messages = () => {
  const { messages, pending } = useChatProvider();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollDown = () => scrollRef.current?.scrollIntoView({ behavior: "auto" });

  useEffect(() => {
    scrollDown()
  });

  return (
    <div className="w-full max-w-xl mt-4 mb-2 overflow-y-auto">
      <div className="space-y-4 flex flex-col">
        {messages.map((message: AIMessage, index: number) => (
          <ToolCallProvider key={index} message={message} scrollDown={scrollDown}>
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
