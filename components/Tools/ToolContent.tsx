import { useToolCallProvider } from "@/providers/ToolCallProvider";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();

  return (
    <div>
      {toolName === "getConnectedProfile" && <div className="text-black">Tool Calling</div>}
    </div>
  );
};

export default ToolContent;
