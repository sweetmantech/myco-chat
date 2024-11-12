import { useChatProvider } from "@/providers/ChatProvider";
import { useFileUploadProvider } from "@/providers/FileUploadProvider";
import { cn } from "@/lib/utils";
import useConnectWallet from "@/hooks/useConnectWallet";
import { Button } from "../ui/Button";

const ProceedButton = ({ className }: { className?: string }) => {
  const { append, pending } = useChatProvider();
  const { address } = useConnectWallet();
  const { imageUri, mimeType, name } = useFileUploadProvider();

  const onSubmit = async () => {
    append({
      id: `${address}-${Date.now()}`,
      role: "user",
      content: `Create a new token.
${imageUri ? "Image: " + imageUri : ""}
${mimeType ? "MimeType: " + mimeType : ""}
${name ? "Title: " + name : ""}`,
    })
  };

  return (
    <Button
      disabled={pending}
      onClick={onSubmit}
      className={cn(
        "flex flex-col items-center justify-center gap-1 bg-black text-white text-center border border-gray-300 h-auto whitespace-normal rounded-2xl shadow-md hover:shadow-lg transition-shadow text-sm m-3",
        className,
      )}
    >
      {"Create a token"}
    </Button>
  );
};

export default ProceedButton;
