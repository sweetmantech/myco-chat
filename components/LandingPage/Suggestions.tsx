import Image from "next/image";
import SuggestionButton from "./SuggestionButton";

const promptOne = "How many times did I post this week???";
const promptTwo = "What's my Zora score???";

const Suggestions = () => (
  <div className="flex flex-col items-center space-y-4">
    <div className="rounded-full overflow-hidden">
      <Image src="/myco-logo.png" alt="Mushroom logo" width={80} height={80} />
    </div>
    <div className="flex items-center space-x-2">
      <SuggestionButton suggestion={promptOne} />
      <SuggestionButton suggestion={promptTwo} />
    </div>
  </div>
);

export default Suggestions;
