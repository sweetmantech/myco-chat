import { ScrollTo } from "react-scroll-to";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="w-full items-center flex flex-col max-h-[85vh]">
      <ScrollTo>{({ scroll }) => <Messages scroll={scroll} />}</ScrollTo>
      <ChatInput />
    </div>
  );
};

export default Chat;
