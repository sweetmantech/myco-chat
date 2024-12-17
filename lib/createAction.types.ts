import type { ToolInvocation } from "ai";
import { ReactNode } from "react";

export type AIState = Array<{
  id?: number;
  name?: "createToken";
  role: "user" | "assistant" | "system";
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>; 
