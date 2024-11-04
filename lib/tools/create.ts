import { tool } from "ai";
import { z } from "zod";

const create = () => tool({
  description: `Create a new agent.
    IMPORTANT: Always call this tool first for ANY question related to creating agent.
    Do NOT attempt to answer questions on these topics without calling this tool first.
    
    Example questions that MUST trigger this tool:
    - "Create a new agent."
    - "I wanna create a new agent."`,
  parameters: z.object({
    address: z.string().describe("The connected coinbase smart wallet."),
  }),
  execute: async () => {
    return {
      content: "Agent created successfully.",
      role: "assistant",
    };
  },
});

export default create;
