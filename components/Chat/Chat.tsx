import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { useAccount } from "wagmi";
import useConnectWallet from "@/hooks/useConnectWallet";
import { useChatProvider } from "@/providers/ChatProvider";

const Chat = () => {
  const { connectWallet } = useConnectWallet();
  const { address } = useAccount();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
  } = useChatProvider();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!address) {
      e.preventDefault();
      await connectWallet();
      console.log("No address");
      return;
    }
    handleChatSubmit(e);
  };

  return (
    <div className="w-full">
      <Messages messages={messages} />
      <ChatInput
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
      />
    </div>
  );
};

export default Chat;
