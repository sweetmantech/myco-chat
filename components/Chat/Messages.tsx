import { Message } from "ai";
import { TvMinimalPlay } from "lucide-react";
import useProfileSearch from "@/hooks/useProfileSearch";

const Messages = ({ messages }: { messages: Message[] }) => {
  const { profile } = useProfileSearch()

  return (
    <div className="w-full max-w-xl mt-4 mb-4 overflow-y-auto">
      <div className="space-y-4 flex flex-col">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={`${message.role === "assistant" ? "flex" : ""}`}
          >
            {
              message.role === "assistant" && (
                <div className="w-8 h-8">
                  {
                    profile.length > 0 ? (
                      <img src={profile[0].avatar} alt="PFP" width={32} height={32} className="rounded-full" />
                    ) : (
                      <TvMinimalPlay size={32} color="#000000" />
                    )
                  }
                </div>
              )
            }
            <div
              className={`p-3 rounded-lg ${message.role === "user"
                ? "bg-black text-white w-1/2 float-right"
                : "bg-transparent text-black w-[90%]"
                }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
