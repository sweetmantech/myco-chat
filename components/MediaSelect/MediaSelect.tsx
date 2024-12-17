import * as React from "react";
import { useRef } from "react";
import { useChatProvider } from "@/providers/ChatProvider";
interface UploadBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUploaded?: (imageUrl: string) => void;
}
export const UploadBox: React.FC<UploadBoxProps> = ({ isOpen, onClose, onImageUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { append } = useChatProvider();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      // Upload image to server endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const { url } = await response.json();
      // Trigger callback with image URL
      if (onImageUploaded) {
        onImageUploaded(url);
      } else {
        // Append to chat provider
        await append({
          content: `<image>${url}</image>`,
          role: "user",
          id: `image-${Date.now()}`,
        });
      }
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    }
  };
  const handleClick = () => fileInputRef.current?.click();
  if (!isOpen) return null;
  return (
    <div
      className="flex flex-col text-2xl text-center text-black rounded-none max-w-[fit-content] mb-6"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      aria-label="Upload file"
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
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
export default UploadBox;