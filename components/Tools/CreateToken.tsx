import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div>
      {status === CreateTokenResponse.MISSING_MEDIA && <div />}
      {status === CreateTokenResponse.MISSING_TITLE && <div />}
      {status === CreateTokenResponse.MISSING_COLLECTION && <div />}
    </div>
  );
};

export default CreateToken;
