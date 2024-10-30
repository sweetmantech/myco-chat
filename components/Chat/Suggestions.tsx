import { useChatProvider } from "@/providers/ChatProvider";
import SuggestionButton from "../LandingPage/SuggestionButton";

const Suggestions = () => {
  const { suggestions } = useChatProvider();

  return (
    <div className="flex flex-col items-center space-y-1 mb-2">
      {suggestions.map((suggestion) => (
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
