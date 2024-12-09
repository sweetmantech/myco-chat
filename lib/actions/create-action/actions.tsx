"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { CoreMessage, ToolInvocation } from "ai";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import createToken from "@/lib/tools/createToken";
import { MediaUpload } from "@/components/MediaUpload";



const SYSTEM_PROMPT = `\
You are a helpful assistant that can create tokens on the chain.
You can create a token by calling the create tool.
Messages inside [] means that it is a UI element or a user event.
`;

export async function sendMessage(message: string): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> {
  const history = getMutableAIState<typeof AI>();

  history.update([
    ...history.get(),
    {
      role: "user",
      content: message,
    },
  ]);

  const reply = await streamUI({
    model: { name: "gpt-4", provider: "openai" },
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <div className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </div>
    ),
    text: ({ content, done, toolInvocations }) => {
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
        
        // If there was a tool invocation and it was the create tool
        if (toolInvocations?.[0]?.name === 'create') {
          return (
            <div>
              <MediaUpload />
              <div>{content}</div>
            </div>
          );
        }
      }
      return <div>{content}</div>;
    },
    tools: {
      create: createToken(message),
    },
  });

  return {
    id: Date.now(),
    role: "assistant",
    display: reply.value,
  };
}

export type AIState = Array<{
  id?: number;
  name?: "create";
  role: "user" | "assistant" | "system";
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>;

export const AI = createAI({
  initialAIState: [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    }
  ] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});