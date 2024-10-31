import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const Conversation = ({ id, name, className }: { id: string; name: string; className?: string }) => {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => push(`/${id}`)}
      className={cn(
        "flex flex-col items-start justify-start gap-1 text-black text-left border border-gray-300 h-auto whitespace-normal rounded-2xl shadow-md hover:shadow-lg transition-shadow text-lg",
        className,
      )}
    >
      {name}
    </Button>
  );
};

export default Conversation;
