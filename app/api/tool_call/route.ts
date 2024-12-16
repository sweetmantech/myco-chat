import { AI_MODEL } from "@/lib/consts";
import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { LanguageModelV1, streamText } from "ai";
import toolSystemMessage from "@/lib/tools/toolSystemMessage";
import { CreateTokenResponse } from "@/lib/toolResponse.types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [] } = body;
    
    // Extract tool information from the last message if available
    const lastMessage = messages[messages.length - 1];
    const toolInvocations = lastMessage?.toolInvocations || [];
    const toolInvocation = toolInvocations.find((t: { state: string }) => t.state === "result");
    
    const toolName = body.toolName || toolInvocation?.toolName;
    const question = body.question || toolInvocation?.result?.question || lastMessage?.content;
    const context = body.context || toolInvocation?.result?.context || {};

    // Only require toolName if there's a tool invocation
    if (toolInvocations.length > 0 && !toolName) {
      console.error('Tool call API - missing toolName');
      return Response.json({ message: "toolName is required" }, { status: 400 });
    }

    const systemMessage = toolSystemMessage(context || {}, question || "", toolName);

    const result = await streamText({
      model: openai(AI_MODEL) as LanguageModelV1,
      system: systemMessage,
      maxTokens: 1111,
      temperature: 0.7,
      messages: [{
        role: "user",
        content: question || ""
      }],
      tools: {
        createToken: {
          description: "Create a new token with provided parameters. ALWAYS call this tool first for ANY token creation related questions.",
          parameters: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: Object.values(CreateTokenResponse),
                description: "The current status of token creation process"
              }
            },
            required: ["status"]
          }
        }
      },
      toolChoice: { type: "tool", toolName: "createToken" },
      experimental_toolCallStreaming: true
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Tool call API error:', error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
