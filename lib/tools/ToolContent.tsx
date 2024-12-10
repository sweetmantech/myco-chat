import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "@/components/MediaUpload";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();

  return (
    <div>
      {(toolName === "createToken") && <MediaUpload />}
    </div>
  );
};

export default ToolContent;
