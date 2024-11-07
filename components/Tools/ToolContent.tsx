import { useToolCallProvider } from "@/providers/ToolCallProvider";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();

  return (
    <div>
      {toolName === "getConnectedProfile" && <div />}
    </div>
  );
};

export default ToolContent;
