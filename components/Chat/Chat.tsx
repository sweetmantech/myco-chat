import ChatInput from "./ChatInput";
import { useCsrfToken } from "@/packages/shared/src/hooks";
import { useChat } from "ai/react";
import { useQueryClient } from "@tanstack/react-query";
import Messages from "./Messages";
import { useAccount } from "wagmi";
import useConnectWallet from "@/hooks/useConnectWallet";

const Chat = () => {
  const { connectWallet } = useConnectWallet();
  const { address } = useAccount();
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const queryClient = useQueryClient();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
  } = useChat({
    api: `/api/chat`,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: {
      accountId,
    },
    onError: console.error,
    onFinish: () => {
      void queryClient.invalidateQueries({
        queryKey: ["credits", accountId],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit", address);
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
