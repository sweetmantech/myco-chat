import Image from "next/image";
import { SUGGESTIONS } from "@/lib/consts";
import SuggestionButton from "./SuggestionButton";

const Suggestions = () => (
  <div className="flex flex-col items-center space-y-4">
    <div className="rounded-full overflow-hidden">
      <Image src="/myco-logo.png" alt="Mushroom logo" width={80} height={80} />
    </div>
    <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-x-4 lg:items-center lg:space-y-0">
      {SUGGESTIONS.map((suggestion) => (
        <SuggestionButton
          suggestion={suggestion}
          key={suggestion}
          initial={true}
        />
      ))}
    </div>
  </div>
);

export default Suggestions;
