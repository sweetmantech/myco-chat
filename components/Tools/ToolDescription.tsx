import { Message as AIMessage } from "ai";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import Answer from "../Chat/Answer";

const ToolDescription = ({ message }: { message: AIMessage }) => {
  const { answer, toolName } = useToolCallProvider();
  const content = message.content || answer;

  return (
    <>
      {!toolName && <Answer content={content} role={message.role} />}
    </>
  );
};

export default ToolDescription;
