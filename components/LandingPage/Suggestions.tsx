import Image from "next/image";
import { useChatProvider } from "@/providers/ChatProvider";
import { Button } from "@/components/ui/Button";

const promptOne = "How many tokens have I created this week?";

const Suggestions = () => {
  const { append } = useChatProvider();

  const onSubmit = async (message: string) => {
    append({ id: "1", role: "user", content: message });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="rounded-full overflow-hidden">
        <Image
          src="/myco-logo.png"
          alt="Mushroom logo"
          width={80}
          height={80}
        />
      </div>
      <Button
        onClick={() => onSubmit(promptOne)}
        className="text-black border border-black"
      >
        {promptOne}
      </Button>
    </div>
  );
};

export default Suggestions;
