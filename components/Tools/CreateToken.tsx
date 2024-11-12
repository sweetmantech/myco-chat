import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import Answer from "../Chat/Answer";

const CreateToken = () => {
  const { context } = useToolCallProvider();
  const status = context?.status;

  return (
    <div className="w-full">
      {(status === CreateTokenResponse.MISSING_MEDIA) && (
        <>
          <Answer content={context.answer} role="assistant" />
        </>
      )}
    </div>
  );
};

export default CreateToken;
