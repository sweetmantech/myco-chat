import { useEffect } from "react";
import { Message } from "ai";
import { TvMinimalPlay } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "react-scroll-to";
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import { useChatProvider } from "@/providers/ChatProvider";
import Thinking from "./Thinking";

const Messages = ({
  scroll,
}: {
  scroll: ({ smooth, y }: { smooth: boolean; y: number }) => void;
}) => {
  const { messages, pending, suggestions } = useChatProvider();
  const { profile } = useProfileSearch();

  useEffect(() => {
    scroll({ smooth: true, y: Number.MAX_SAFE_INTEGER });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, pending, suggestions]);

  return (
    <ScrollArea className="w-full max-w-xl mt-4 mb-2 overflow-y-auto">
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
    </ScrollArea>
  );
};

export default Messages;
