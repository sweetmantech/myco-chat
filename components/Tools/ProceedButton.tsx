import { useChatProvider } from "@/providers/ChatProvider";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { cn } from "@/lib/utils";
import useConnectWallet from "@/hooks/useConnectWallet";
import { Button } from "../ui/Button";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const ProceedButton = ({ className }: { className?: string }) => {
  const { append, pending } = useChatProvider();
  const { address } = useConnectWallet();
  const { name, animationUri, imageUri } = useZoraCreateProvider();
  const { selectedCollection } = useCollectionProvider();

  const onSubmit = async () => {
    append({
      id: `${address}-${Date.now()}`,
      role: "user",
      content: `Create a new token. <br />
        ${imageUri ? `Image: ${imageUri} <br />` : ""}
        ${animationUri ? `Media: ${animationUri} <br />` : ""}
        ${name ? `Title: ${name} <br />` : ""}
        ${selectedCollection?.address ? "Collection: " + selectedCollection.address : ""}`,
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
