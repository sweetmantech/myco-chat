import { LoaderCircle, TvMinimalPlay } from "lucide-react";
import useProfileSearch from "@/hooks/useProfileSearch";
import getZoraPfpLink from "@/lib/zora/getZoraPfpLink";

const Thinking = () => {
  const { profile } = useProfileSearch();

  return (
    <div className="flex gap-2 w-full max-w-3xl mx-auto items-center pb-2 text-black">
      <div className="size-fit">
        {
          profile.length > 0 ? (
            <img src={getZoraPfpLink(profile[0])} alt="PFP" width={36} height={36} className="rounded-full" />
          ) : (
            <TvMinimalPlay className="h-6 w-6" />
          )
        }
      </div>
      <p>is thinking...</p>
      <LoaderCircle className="h-4 w-4 animate-spin" />
    </div>
  );
};

export default Thinking;
