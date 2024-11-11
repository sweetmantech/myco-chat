import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";
import ProceedButton from "./ProceedButton";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div className="w-full">
      {(status === CreateTokenResponse.MISSING_MEDIA) && (
        <>
          <Answer content={context.answer} role="assistant" />
          {(status === CreateTokenResponse.MISSING_MEDIA) && (<MediaUpload />)}
          <ProceedButton />
        </>
      )}
    </div>
  );
};

export default CreateToken;
