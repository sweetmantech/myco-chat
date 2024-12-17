import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "@/components/MediaUpload";

import { Tools } from "@/lib/Tool";
import { CreateTokenResponse } from "@/lib/toolResponse.types";

const ToolContent = () => {
  const { toolName, context } = useToolCallProvider();

  if (toolName !== Tools.createToken) return null;

  switch (context?.status) {
    case CreateTokenResponse.MISSING_IMAGE:
      return <MediaUpload />;
    case CreateTokenResponse.MISSING_TITLE:
      return<div>Include a title</div>;
    case CreateTokenResponse.MISSING_COLLECTION:
      return <div>Include a collection</div>;
    case CreateTokenResponse.SIGN_TRANSACTION:
      return <div>Transaction signing UI...</div>;
    default:
      return null;
  }
};

export default ToolContent;
