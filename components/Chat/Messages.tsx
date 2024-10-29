import { Message } from "ai";
import { TvMinimalPlay } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import { useChatProvider } from "@/providers/ChatProvider";
import Thinking from "./Thinking";

const Messages = ({ messages }: { messages: Message[] }) => {
  const { profile } = useProfileSearch();
  const { pending } = useChatProvider();

  return (
    <div className="w-full max-w-xl mt-4 mb-4 overflow-y-auto">
      <div className="space-y-4 flex flex-col">
        {messages.map((message: Message, index: number) => message.content && (
          <div
            key={index}
            className={message.role === "assistant" ? "flex" : ""}
          >
            {
              message.role === "assistant" && (
                <div className="w-8 h-8">
                  {
                    profile.length > 0 ? (
                      <img
                        src={getZoraPfpLink(profile[0])}
                        alt="PFP"
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                    ) : (
                      <TvMinimalPlay size={32} color="#000000" />
                    )
                  }
                </div>
              )
            }
            <div
              className={`p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-black text-white float-right max-w-[85%]"
                  : "flex-1 bg-transparent text-black"
              }`}
            >
              <ReactMarkdown className="text-sm">
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {pending && <Thinking />}
      </div>
    </div>
  );
};

export default Messages;
