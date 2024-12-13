import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "@/components/MediaUpload";
import { Tools } from "@/lib/Tool";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();
  console.log("toolName: ", toolName);

  return (
    <div>
      {(toolName === Tools.createToken) && <MediaUpload />}
    </div>
  );
};

export default ToolContent;
