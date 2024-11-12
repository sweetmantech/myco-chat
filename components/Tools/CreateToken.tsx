import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";
import ProceedButton from "./ProceedButton";
import Title from "./Title";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div className="w-full">
      {(status === CreateTokenResponse.MISSING_MEDIA ||
        status === CreateTokenResponse.MISSING_TITLE
      ) && (
        <>
          <Answer content={context.answer} role="assistant" />
          {(status === CreateTokenResponse.MISSING_MEDIA) && (<MediaUpload />)}
          {(status === CreateTokenResponse.MISSING_TITLE) && (<Title />)}
          <ProceedButton />
        </>
      )}
    </div>
  );
};

export default CreateToken;
