import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { FileUploadProvider } from "@/providers/FileUploadProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";
import CollectionSelect from "./CollectionSelect";
import Title from "./Title";
import ProceedButton from "./ProceedButton";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div className="w-full">
      <Answer content={context.answer} role="assistant" />
      {status === CreateTokenResponse.MISSING_MEDIA && (
        <FileUploadProvider>
          <MediaUpload />
        </FileUploadProvider>
      )}
      {status === CreateTokenResponse.MISSING_TITLE && <Title />}
      {status === CreateTokenResponse.MISSING_COLLECTION && <CollectionSelect />}
      <ProceedButton />
    </div>
  );
};

export default CreateToken;
