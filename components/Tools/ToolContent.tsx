import { useToolCallProvider } from "@/providers/ToolCallProvider";
import CreateToken from "./CreateToken";
import Answer from "../Chat/Answer";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();

  return (
    <>
      {toolName === "getConnectedProfile" && (
        <Answer content={"Here is your Zora profile:"} role={"assistant"} />
      )}
      {toolName === "createToken" && <CreateToken />}
    </>
  );
};

export default ToolContent;
