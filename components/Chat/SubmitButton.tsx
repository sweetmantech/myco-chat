import { useChatProvider } from "@/providers/ChatProvider";
import { ArrowUpIcon } from "lucide-react";

const SubmitButton = () => {
  const { input, pending } = useChatProvider();
  const color = (!pending && input.length > 0) ? "#000000" : "#F2E8CC";
  const borderColorClass =
    (!pending && input.length > 0) ? "border-black" : "border-background";

  return (
    <button
      type="submit"
      className={`rounded-full border-[5px] ${borderColorClass}`}
      aria-label="Send message"
      disabled={pending}
    >
      <ArrowUpIcon size={24} strokeWidth={4} color={color} />
    </button>
  );
};

export default SubmitButton;
