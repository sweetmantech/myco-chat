import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "@/components/MediaUpload";
import { Tools } from "@/lib/Tool";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();
  console.log("ToolName in ToolContent:", toolName);
  const renderToolContent = () => {
    switch (toolName) {
      case Tools.createToken:
        return <MediaUpload />;
      // Add other tool cases here
      default:
        return null
    }
  };

  return (
    <div className="tool-content">
      {renderToolContent()}
    </div>
  );
};

export default ToolContent;
