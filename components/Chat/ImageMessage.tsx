import React from 'react';
interface ImageMessageProps {
  src: string;
}
const ImageMessage: React.FC<ImageMessageProps> = ({ src }) => {
  return (
    <div className="max-w-[300px] rounded-lg overflow-hidden">
      <img
        src={src}
        alt="Uploaded"
        className="w-full h-auto object-contain"
        loading="lazy"
      />
    </div>
  );
};
export default ImageMessage;