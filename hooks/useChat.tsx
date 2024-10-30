import { Message } from "ai";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import useConnectWallet from "./useConnectWallet";
import useSuggestions from "./useSuggestions";
import useMessages from "./useMessages";
import useConversations from "./useConversations";

const useChat = () => {
  const { address, connectWallet } = useConnectWallet();
  const { finalCallback, suggestions, setCurrentQuestion } = useSuggestions();
  const { push } = useRouter();
  const { conversationId } = useConversations();
  const {
    conversationRef,
    input,
    appendAiChat,
    handleAiChatSubmit,
    handleInputChange,
    messagesRef,
    pending,
    fetchInitialMessages,
  } = useMessages();

  const goToNewConversation = async () => {
    if (conversationId) return;
    const newId = uuidV4();
    conversationRef.current = newId;
    push(`/${newId}`);
  };

  const clearQuery = async () => {
    if (!address) return;
    await fetchInitialMessages(address);
  };

  const isPrepared = () => {
    if (!address) {
      connectWallet();
      return false;
    }
    return true;
  };

  const append = async (message: Message) => {
    if (!isPrepared()) return;
    setCurrentQuestion(message);
    appendAiChat(message);
    await goToNewConversation();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setCurrentQuestion({
      content: input,
      role: "user",
      id: `${address}-${Date.now()}`,
    });
    handleAiChatSubmit(e);
    await goToNewConversation();
  };

  return {
    suggestions,
    messages: messagesRef.current,
    input,
    pending,
    append,
    handleInputChange,
    handleSubmit,
    finalCallback,
    clearQuery,
  };
};

export default useChat;
