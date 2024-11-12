import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";
import Title from "./Title";
import CollectionSelect from "./CollectionSelect";
import ProceedButton from "./ProceedButton";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div className="w-full">
      {(status === CreateTokenResponse.MISSING_MEDIA ||
        status === CreateTokenResponse.MISSING_TITLE ||
        status === CreateTokenResponse.MISSING_COLLECTION
      ) && (
        <>
          <Answer content={context.answer} role="assistant" />
          {(status === CreateTokenResponse.MISSING_MEDIA) && (<MediaUpload />)}
          {(status === CreateTokenResponse.MISSING_TITLE) && (<Title />)}
          {status === CreateTokenResponse.MISSING_COLLECTION && <CollectionSelect />}
          <ProceedButton />
        </>
      )}
    </div>
  );
};

export default CreateToken;
