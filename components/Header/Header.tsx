"use client";

import { BookOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useConnectWallet from "@/hooks/useConnectWallet";
import Button from "../Button";
import LoginButton from "../LoginButton";
import Tooltip from "../ui/Tooltip";
import { usePrivy } from "@privy-io/react-auth";

const Header = () => {
  const { push } = useRouter();
  const { address, connectWallet } = useConnectWallet();
  const { login } = usePrivy();

  const handleClick = (link: string) => {
    if (address) {
      push(link);
    } else {
      // connectWallet();
      login();
    }
  };

  return (
    <div className="flex justify-between fixed top-0 left-0 w-screen z-[100] p-4">
      <div className="font-nounish text-4xl text-black">myco.wtf</div>
      <div className="flex items-center gap-4">
        <Tooltip
          id={"new-conversation-tooltip"}
          message="New Chat"
          className="!z-[100]"
        >
          <Button className="min-w-fit" onClick={() => handleClick("/")}>
            <Plus size={32} />
          </Button>
        </Tooltip>
        <Tooltip
          id={"chat-history-tooltip"}
          message="Chat History"
          className="!z-[100]"
        >
          <Button className="min-w-fit" onClick={() => handleClick("/history")}>
            <BookOpen size={32} />
          </Button>
        </Tooltip>
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
