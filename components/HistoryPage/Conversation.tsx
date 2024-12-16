import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const Conversation = ({ id, name, className }: { id: string; name: string; className?: string }) => {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => push(`/${id}`)}
      className={cn(
        "text-black text-left border border-gray-300 h-auto whitespace-normal rounded-2xl shadow-md hover:shadow-lg transition-shadow text-lg justify-start",
        className,
      )}
    >
      <p className="!truncate !overflow-x-hidden">{name}</p>
    </Button>
  );
};

export default Conversation;
