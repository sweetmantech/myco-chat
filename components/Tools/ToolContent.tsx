import { useToolCallProvider } from "@/providers/ToolCallProvider";
import Answer from "../Chat/Answer";
import CreateToken from "./CreateToken";

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
