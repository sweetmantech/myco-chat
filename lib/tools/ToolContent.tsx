import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { Message } from "ai";
import ReactMarkdown from "react-markdown";

interface ToolContentProps {
  message: Message
}

const ToolContent = ({ message }: ToolContentProps) => {

  let toolData;
  try {
    toolData = JSON.parse(message.content);
  } catch {

    return <ReactMarkdown className="text-sm">{message.content}</ReactMarkdown>;
  }

  const { context } = toolData;
  console.log(context)
  if (!context || context.toolName !== 'createToken') {

    return <ReactMarkdown className="text-sm">{message.content}</ReactMarkdown>;
  }

  switch (context.status) {
    case CreateTokenResponse.MISSING_IMAGE:
      return <div>Upload Media</div>;
    case CreateTokenResponse.MISSING_TITLE:
      return <div>Include a title</div>;
    case CreateTokenResponse.MISSING_COLLECTION:
      return <div>Include a collection</div>;
    case CreateTokenResponse.SIGN_TRANSACTION:
      return <div>Transaction signing UI...</div>;
    default:
      return <ReactMarkdown className="text-sm">{message.content}</ReactMarkdown>;
  }
};

export default ToolContent;
