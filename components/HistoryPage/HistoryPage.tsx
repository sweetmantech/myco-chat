import useConversations from "@/hooks/useConversations";
import Conversation from "./Conversation";

const HistoryPage = () => {
  const { conversations } = useConversations();

  return (
    <div className="flex font-nounish flex-col h-[100vh] bg-background border border-black">
      <main className="flex-1 flex flex-col p-4 items-center">
        <div className="flex flex-col items-center mt-24 space-y-4 w-[576px]">
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.metadata.id}
              id={conversation.metadata.conversationId}
              name={conversation.metadata.content}
              className="w-full"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
