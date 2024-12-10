"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { CoreMessage } from "ai";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { SYSTEM_PROMPT } from "@/lib/consts";
import { createTool } from "../tools/create-token.tool";
import { AIState, UIState } from "@/lib/createAction.types";
import { AI_MODEL } from "@/lib/consts";
import OpenAI from "openai";

const openai = new OpenAI();

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

  const stream = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...history.get(),
    ],
    stream: true,
  });

  const reply = await streamUI({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: stream as any,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <div className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </div>
    ),
    text: ({ content, done }) => {
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
        return <div>{content}</div>;
      }
      return <div>{content}</div>;
    },
    tools: {
      create: createTool,
    },
  });

  return {
    id: Date.now(),
    role: "assistant",
    display: reply.value,
  };
}

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