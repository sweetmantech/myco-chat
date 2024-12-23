import { useChatProvider } from "@/providers/ChatProvider";
import React, { useRef } from "react";
interface MediaSelect {
  setIsShowMedia: (isShowMedia: boolean) => void;
}

export const MediaSelect: React.FC<MediaSelect> = ({ setIsShowMedia }) => {
  const { append } = useChatProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject("Failed to read the file.");
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Image = await convertImageToBase64(file);
        if (base64Image) {
          await append({
            role: "user",
            id: `image-${Date.now()}`,
            content: base64Image, // Base64-encoded image
          });
          setIsShowMedia(false);
        }
      } catch (error) {
        throw new Error(`Failed to create image message: ${error}`);
      }
    }
  };

  return (
    <div
      className="flex flex-col text-2xl text-center text-black rounded-none max-w-[fit-content] mb-6"
      role="button"
      tabIndex={0}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
      }}
      aria-label="Upload file"
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageSelect}
        className="hidden"
      />
      <div className="flex flex-col px-14 py-20 w-full rounded-lg border-2 border-black border-dashed">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/03dbe05b4a7595cf16b7b833b4933bcc7feacc90207f5c39723c79d7fbaf9eee?placeholderIfAbsent=true&apiKey=eb4e8d14b0ec446e9534e4624cad334a"
          className="object-contain self-center w-12 aspect-square"
          alt="upload"
        />
        <div className="self-start">Click to upload</div>
      </div>
    </div>
  );
};
export default MediaSelect;
