import { getSupabaseServerClient } from '@/packages/supabase/src/clients/server-client';
import { getSupabaseServerAdminClient } from '@/packages/supabase/src/clients/server-admin-client';
import { createChatLLMService, StreamResponseSchema } from '@/lib/server/chat-llm.service';
import { enhanceRouteHandler } from '@/packages/next/src/routes';

export const dynamic = 'force-dynamic';

export const POST = enhanceRouteHandler(
  async ({ body }) => {
    const client = getSupabaseServerClient();
    const adminClient = getSupabaseServerAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = createChatLLMService(client as any, adminClient as any);
    const referenceId = "if1Fg9bo"; // hard coded for demo
    const address = body.address || "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38";

    try {    
      return await service.streamResponse(body, referenceId, address);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return new Response(message, { status: 500 });
    }
  },
  {
    schema: StreamResponseSchema.extend({
      address: StreamResponseSchema.shape.accountId.optional(),
    }),
  },
);
