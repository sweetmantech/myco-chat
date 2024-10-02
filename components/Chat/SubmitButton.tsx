import { useChatProvider } from "@/providers/ChatProvider";
import { ArrowUpIcon } from "lucide-react";

const SubmitButton = () => {
  const { input } = useChatProvider();
  const color = input.length > 0 ? "#000000" : `#F2E8CC`;
  const borderColor = input.length > 0 ? `black` : `[#F2E8CC]`;
  return (
    <button
      type="submit"
      className={`rounded-full border border-[5px] border-${borderColor}`}
      aria-label="Send message"
    >
      <ArrowUpIcon size={24} strokeWidth={4} color={color} />
    </button>
  );
};

export default SubmitButton;
