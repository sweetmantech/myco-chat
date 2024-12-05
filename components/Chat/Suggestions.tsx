import { useChatProvider } from "@/providers/ChatProvider";
import SuggestionButton from "../LandingPage/SuggestionButton";

const Suggestions = () => {
  const { suggestions } = useChatProvider();
  const limitedChatSuggestions = suggestions.slice(0, 2);

  return (
    <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-x-4 mb-2 lg:items-center lg:space-y-0">
      {limitedChatSuggestions.map((suggestion) => (
        <SuggestionButton
          suggestion={suggestion}
          key={suggestion}
          className="text-sm w-full"
        />
      ))}
    </div>
  );
};

export default Suggestions;
