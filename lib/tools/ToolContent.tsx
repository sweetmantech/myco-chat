import { useToolCallProvider } from "@/providers/ToolCallProvider";
import MediaUpload from "@/components/MediaUpload";
import { Tools } from "@/lib/Tool";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();

  const renderToolContent = () => {
    switch (toolName) {
      case Tools.createToken:
        return <MediaUpload />;
      // Add other tool cases here
      default:
        return <MediaUpload />;
    }
  };

  return (
    <div className="tool-content">
      {renderToolContent()}
    </div>
  );
};

export default ToolContent;
