import { useEffect, useRef } from "react";
import { TvMinimalPlay } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Virtuoso } from 'react-virtuoso';
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import { useChatProvider } from "@/providers/ChatProvider";
import Thinking from "./Thinking";

const Messages = () => {
  const { messages, pending, suggestions } = useChatProvider();
  const { profile } = useProfileSearch();
  const virtuoso = useRef(null);
  const heightOffset = 240 + 40 * suggestions.length;

  useEffect(() => {
    if (virtuoso.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (virtuoso.current as any).scrollToIndex({ index: messages.length, behavior: "auto", align: "end" });
    }
  });

  return (
    <div className="w-full max-w-xl mt-4 mb-2">
      <Virtuoso
        style={{ height: pending ? `calc(100vh - ${heightOffset + 40}px)` : `calc(100vh - ${heightOffset}px)` }}
        data={messages.filter((message) => message.content)}
        totalCount={messages.length}
        ref={virtuoso}
        itemContent={(_, message) => {
          return (
            <div className={`w-full flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`w-fit ${message.role === "assistant" ? "flex" : "max-w-[85%]"} h-fit mb-2`}
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
                  className={`p-3 rounded-lg ${message.role === "user"
                    ? "bg-black text-white w-fit"
                    : "flex-1 bg-transparent text-black"
                    }`}
                >
                  <ReactMarkdown className="text-sm">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )
        }}
      />
      {pending && <Thinking />}
    </div>
  );
};

export default Messages;
