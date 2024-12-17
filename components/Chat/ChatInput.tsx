import { TvMinimalPlay } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import { useChatProvider } from "@/providers/ChatProvider";
import MediaSelect from "../MediaSelect";
import SubmitButton from "./SubmitButton";
import Suggestions from "./Suggestions";
import manifest from "@/public/manifest.json";
const ChatInput = () => {
  const {
    handleSubmit,
    handleInputChange,
    input,
    pending,
    messages,
    append,
  } = useChatProvider();
  const { profile } = useProfileSearch();
  const [showMediaSelect, setShowMediaSelect] = useState(false);
  const color = (!pending && input.length > 0) ? "#000000" : manifest.theme_color;
  const lastProcessedMessageRef = useRef<string>("");
  const pathname = usePathname();
  const isNewChat = pathname === "/";
  useEffect(() => {
    if (messages.length >= 2) {
      const lastMessage = messages[messages.length - 1];
      const secondLastMessage = messages[messages.length - 2];
      const messageKey = `${lastMessage.id}-${secondLastMessage.id}`;
      if (messageKey === lastProcessedMessageRef.current) {
        return;
      }
      if (lastMessage.role === "assistant" &&
          secondLastMessage.role === "user" &&
          secondLastMessage.content.toLowerCase().includes("create")) {
        lastProcessedMessageRef.current = messageKey;
        setShowMediaSelect(true);
      }
    }
  }, [messages]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !pending) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };
  const handleImageUploaded = async (imageUrl: string) => {
    setShowMediaSelect(false);
    // Send image as user message
    await append({
      content: `<image>${imageUrl}</image>`,
      role: "user",
      id: `image-${Date.now()}`
    });
    handleSubmit({
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>);
  };
  return (
    <div className="w-full flex flex-col items-center">
      {showMediaSelect && (
        <MediaSelect
          isOpen={showMediaSelect}
          onClose={() => setShowMediaSelect(false)}
          onImageUploaded={handleImageUploaded}
        />
      )}
      {!isNewChat && <Suggestions />}
      <div className="w-full max-w-[555px] bg-white py-3 rounded-3xl border border-gray-300 p-1.5 mb-3 shadow-lg flex items-center">
        <form onSubmit={handleCustomSubmit} className="w-full flex items-center">
          {profile.length > 0 ? (
            <img
              src={getZoraPfpLink(profile[0])}
              alt="PFP"
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <TvMinimalPlay size={32} color={color} />
          )}
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message MycoChat"
            className="w-full text-black outline-none text-lg px-4 resize-none pr-12 font-normal duration-150 ease-in-out flex items-center"
            aria-label="Chat input"
            rows={1}
          />
          <SubmitButton pending={pending} />
        </form>
      </div>
    </div>
  );
};
export default ChatInput;