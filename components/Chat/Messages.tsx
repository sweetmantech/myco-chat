import { Message } from "ai";
import { TvMinimalPlay } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useProfileSearch from "@/hooks/useProfileSearch";

const Messages = ({ messages }: { messages: Message[] }) => {
  const { profile } = useProfileSearch()

  return (
    <div className="w-full max-w-xl mt-4 mb-4 overflow-y-auto">
      <div className="space-y-4 flex flex-col">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={message.role === "assistant" ? "flex" : ""}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8">
                {profile.length > 0 ? (
                  <img
                    src={`https://zora.co/api/avatar/${profile[0].address}`}
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
                  ? "bg-black text-white max-w-1/2 float-right"
                  : "bg-transparent text-black w-[90%]"
              }`}
            >
              <ReactMarkdown className="text-sm">{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
