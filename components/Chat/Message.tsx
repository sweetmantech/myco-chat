import { Message as AIMessage } from "ai";
import { TvMinimalPlay } from "lucide-react";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import ToolContent from "../Tools/ToolContent";

const Message = ({ message }: { message: AIMessage }) => {
  const { profile } = useProfileSearch();
  const { context } = useToolCallProvider();
  console.log(context)

  return (
    <div
      className={message.role === "assistant" ? "flex" : ""}
    >
      {message.role === "assistant" && (
        <div className="w-8 h-8">
          {profile.length > 0 ? (
            <img
              src={getZoraPfpLink(profile[0])}
              alt="PFP"
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <TvMinimalPlay size={32} color="#000000" />
          )}
        </div>
      )}
      {context && <ToolContent />}
    </div>
  );
};

export default Message;
