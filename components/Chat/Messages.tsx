import { useEffect, useRef, useState } from "react";
import { TvMinimalPlay } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import { useChatProvider } from "@/providers/ChatProvider";
import Thinking from "./Thinking";
import { Message } from "ai";
import Image from "next/image";
import MediaSelect from "./MediaSelect";
import {
  getMissingImageAnswer,
  isImageMissing,
  Message as LastMessageType,
} from "@/utils/helperFunction";

const Messages = () => {
  const { messages, pending } = useChatProvider();
  const { profile } = useProfileSearch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isShowMedia, setIsShowMedia] = useState<boolean>(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  });

  useEffect(() => {
    if (pending) return;
    const lastMessage = messages[messages.length - 2];
    const hasVisualContent = isImageMissing(lastMessage as LastMessageType);
    setIsShowMedia(hasVisualContent);
  }, [messages, pending]);

  function isBase64Image(str: string): boolean {
    const base64ImageRegex =
      /^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/;
    return base64ImageRegex.test(str);
  }

  const renderedContent = (content: string) => {
    if (isBase64Image(content)) {
      return (
        <div className="max-w-[300px] rounded-lg overflow-hidden">
          <Image
            src={content}
            alt="Uploaded"
            className="w-full h-auto object-contain"
            loading="lazy"
            height={500}
            width={500}
          />
        </div>
      );
    } else {
      return (
        <ReactMarkdown className="text-sm">
          {isShowMedia
            ? getMissingImageAnswer(
                messages[messages.length - 2] as LastMessageType
              )
            : content}
        </ReactMarkdown>
      );
    }
  };

  return (
    <div className="w-full max-w-xl mt-4 mb-2 overflow-y-auto">
      <div className="space-y-4 flex flex-col">
        {messages.map(
          (message: Message, index: number) =>
            message.content && (
              <div
                key={index}
                className={message.role === "assistant" ? "flex" : ""}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8">
                    {profile.length > 0 ? (
                      <Image
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
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-black text-white float-right max-w-[85%]"
                      : "flex-1 bg-transparent text-black"
                  }`}
                >
                  {renderedContent(message.content)}
                </div>
              </div>
            )
        )}
        <div className="mx-auto">
          {isShowMedia && <MediaSelect setIsShowMedia={setIsShowMedia} />}
        </div>
        {pending && <Thinking />}
      </div>
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
