import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div>
      <Answer content={context.answer} role="assistant" />
      {status === CreateTokenResponse.MISSING_MEDIA && <MediaUpload />}
      {status === CreateTokenResponse.MISSING_TITLE && <div />}
      {status === CreateTokenResponse.MISSING_COLLECTION && <div />}
    </div>
  );
};

export default CreateToken;
