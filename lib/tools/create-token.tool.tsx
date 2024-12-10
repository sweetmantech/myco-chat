"use client"
import { z } from "zod";
import createToken from "@/lib/tools/createToken";
import MediaUpload from "@/components/MediaUpload";
import { TokenCreator } from "@/components/TokenCreator/TokenCreator";

const TokenSchema = z.object({
  address: z.string().describe("The creator wallet address."),
  title: z.string().describe("The title of the token."),
  collectionAddress: z.string().optional().describe("The contract address of the collection."),
  mimeType: z.string().optional().describe("The type of media."),
});

type TokenParams = z.infer<typeof TokenSchema>;

export const createTool = {
  description: "Create a new token on the chain",
  parameters: TokenSchema,
  render: async function* ({ address, title, collectionAddress, mimeType }: TokenParams) {
    let mediaUri: string | undefined;
    let animationUri: string | undefined;

    yield (
      <div>
        <TokenCreator onSubmit={(image, animation) => {
          mediaUri = image;
          animationUri = animation;
        }} />
        <div className="text-slate-500 mt-2">Please select and upload your media file to proceed.</div>
      </div>
    );

    yield (
      <div>
        <MediaUpload isGenerating={true} />
        <div>Creating token {title}...</div>
      </div>
    );

    const result = await createToken("").execute({
      address,
      image: mediaUri as string,
      animation: animationUri,
      title,
      collectionAddress,
      mimeType: mimeType || "image/*",
    });

    return (
      <div>
        <MediaUpload isGenerating={false} />
        <div>{result.context.answer}</div>
      </div>
    );
  }
};