import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { FileUploadProvider } from "@/providers/FileUploadProvider";
import MediaUpload from "./MediaUpload";
import Answer from "../Chat/Answer";
import CollectionSelect from "./CollectionSelect";
import Title from "./Title";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div>
      <Answer content={context.answer} role="assistant" />
      {status === CreateTokenResponse.MISSING_MEDIA && (
        <FileUploadProvider>
          <MediaUpload />
        </FileUploadProvider>
      )}
      {status === CreateTokenResponse.MISSING_TITLE && <Title />}
      {status === CreateTokenResponse.MISSING_COLLECTION && <CollectionSelect />}
    </div>
  );
};

export default CreateToken;
