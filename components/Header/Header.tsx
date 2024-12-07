"use client";

import { BookOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useConnectWallet from "@/hooks/useConnectWallet";
import usePrivyAddress from "@/hooks/usePrivyAddress";
import Button from "../Button";
import LoginButton from "../LoginButton";
import Tooltip from "../ui/Tooltip";
import usePrivyAddress from "@/hooks/usePrivyAddress";

const Header = () => {
  const { push } = useRouter();
  const { connectWallet } = useConnectWallet();
  const address = usePrivyAddress();

  const handleClick = (link: string) => {
    if (address) {
      push(link);
    } else {
      connectWallet();
    }
  };

  return (
    <div className="flex justify-between fixed top-0 left-0 w-screen z-[100] p-4">
      <div className="font-nounish text-2xl md:text-4xl text-black">myco.wtf</div>
      <div className="flex items-center gap-2 md:gap-4">
        <Tooltip
          id={"new-conversation-tooltip"}
          message="New Chat"
          className="!z-[100]"
        >
          <Button
            className="min-w-fit p-3 md:p-4"
            onClick={() => handleClick("/")}
          >
            <Plus className="w-4 h-4 md:w-8 md:h-8" />
          </Button>
        </Tooltip>
        <Tooltip
          id={"chat-history-tooltip"}
          message="Chat History"
          className="!z-[100]"
        >
          <Button
            className="min-w-fit p-3 md:p-4"
            onClick={() => handleClick("/history")}
          >
            <BookOpen className="w-4 h-4 md:w-8 md:h-8" />
          </Button>
        </Tooltip>
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;