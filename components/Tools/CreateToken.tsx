import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div className="w-full">
      {(status === CreateTokenResponse.MISSING_IMAGE) && (
        <>
          <Answer content={context.answer} role="assistant" />
          {(status === CreateTokenResponse.MISSING_IMAGE) && (<MediaUpload />)}
        </>
      )}
    </div>
  );
};

export default CreateToken;
