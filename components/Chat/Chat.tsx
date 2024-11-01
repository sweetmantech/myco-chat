import ChatInput from "./ChatInput";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="w-full items-center flex flex-col max-h-[85vh]">
      <Messages />
      <ChatInput />
    </div>
  );
};

export default Chat;
