import { useChatProvider } from "@/providers/ChatProvider";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const SignButton = ({ className }: { className?: string }) => {
  const { pending } = useChatProvider();
  const { create, creating } = useZoraCreateProvider();

  return (
    <Button
      disabled={pending || creating}
      onClick={create}
      className={cn(
        "flex flex-col items-center justify-center gap-1 bg-black text-white text-center border border-gray-300 h-auto whitespace-normal rounded-2xl shadow-md hover:shadow-lg transition-shadow text-sm mx-3",
        className,
      )}
    >
      {creating ? "Creating..." : "Sign a transaction"}
    </Button>
  );
};

export default SignButton;
