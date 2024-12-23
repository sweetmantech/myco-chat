import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";
import { useChatProvider } from "@/providers/ChatProvider";
import manifest from "@/public/manifest.json";
import { TvMinimalPlay } from "lucide-react";
import SubmitButton from "./SubmitButton";
import Image from "next/image";

const ChatInput = () => {
  const { handleSubmit, handleInputChange, input, pending } = useChatProvider();
  const { profile } = useProfileSearch();
  const color = !pending && input.length > 0 ? "#000000" : manifest.theme_color;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !pending) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[555px] bg-white py-3 rounded-3xl border border-gray-300 p-1.5 mb-3 shadow-lg flex items-center">
        <form onSubmit={handleSubmit} className="w-full flex items-center">
          {profile.length > 0 ? (
            <Image
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
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
