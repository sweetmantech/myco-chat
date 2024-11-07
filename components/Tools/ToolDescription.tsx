import { Message as AIMessage } from "ai";
import { LoaderCircle } from "lucide-react";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import Answer from "../Chat/Answer";

const ToolDescription = ({ message }: { message: AIMessage }) => {
  const { loading, answer, toolName } =
    useToolCallProvider();
  const content = message.content || answer;

  return (
    <div>
      {(toolName === "getCampaign" || toolName === "getArtistAnalysis") && (
        <>
          {loading && !content ? (
            <div className="flex gap-2 items-center">
              <p>is thinking...</p>
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <Answer content={content} role={message.role} />
          )}
        </>
      )}
      {!toolName && <Answer content={content} role={message.role} />}
    </div>
  );
};

export default ToolDescription;
