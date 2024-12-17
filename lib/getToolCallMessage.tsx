import { CreateTokenResponse } from "@/lib/toolResponse.types";
// import { Message } from "ai";
import { v4 as uuidV4 } from "uuid";
import MediaUpload from "@/components/MediaUpload";


const getToolCallMessage = (toolName: string | undefined, context: { status?: CreateTokenResponse }) => {
  if (toolName === "createToken") {
    switch (context?.status) {
      case CreateTokenResponse.MISSING_IMAGE:
        return {
          id: uuidV4(),
          content: "Please provide an image to create your token.",
          role: "assistant",
          display: <MediaUpload />
        };
      case CreateTokenResponse.MISSING_TITLE:
        return {
          id: uuidV4(),
          content: "Please provide a title for your token.",
          role: "assistant",
          display: <div>Include a title</div>
        };
      case CreateTokenResponse.MISSING_COLLECTION:
        return {
          id: uuidV4(),
          content: "Please select a collection for your token.",
          role: "assistant",
          display: <div>Include a collection</div>
        };
      case CreateTokenResponse.SIGN_TRANSACTION:
        return {
          id: uuidV4(),
          content: "Please sign the transaction to create your token.",
          role: "assistant",
          display: <div>Transaction signing UI...</div>
        };
    }
  }
  return null;
};

export default getToolCallMessage;
