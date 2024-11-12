import { useChatProvider } from "@/providers/ChatProvider";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import useConnectWallet from "@/hooks/useConnectWallet";
import { NEW_COLLECTION } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const ProceedButton = ({ className }: { className?: string }) => {
  const { append, pending } = useChatProvider();
  const { address } = useConnectWallet();
  const { animationUri, imageUri, mimeType, name } = useZoraCreateProvider();
  const { selectedCollection } = useCollectionProvider();

  const onSubmit = async () => {
    append({
      id: `${address}-${Date.now()}`,
      role: "user",
      content: `Create a new token.
${imageUri ? "Image: " + imageUri : ""}
${animationUri ? "Media: " + animationUri : ""}
${mimeType ? "MimeType: " + mimeType : ""}
${name ? "Title: " + name : ""}
${selectedCollection?.address ?
  (selectedCollection.address === NEW_COLLECTION.address ?
    "Collection Address: New collection" :
    "Collection Address: " + selectedCollection.address) :
  ""}`,
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
