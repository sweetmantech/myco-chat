"use client"

import { useEffect } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import MediaUpload from "@/components/MediaUpload";

interface TokenCreatorProps {
  onSubmit: (imageUri: string, animationUri?: string) => void;
}

export function TokenCreator({ onSubmit }: TokenCreatorProps) {
  const { imageUri, animationUri } = useZoraCreateProvider();
  
  useEffect(() => {
    if (imageUri || animationUri) {
      onSubmit(imageUri || "", animationUri);
    }
  }, [imageUri, animationUri, onSubmit]);

  return <MediaUpload isGenerating={false} />;
}