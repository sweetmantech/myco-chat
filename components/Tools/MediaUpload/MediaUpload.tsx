import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useFileUploadProvider } from '@/providers/FileUploadProvider'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider';
import { useToolCallProvider } from '@/providers/ToolCallProvider';
import { CreateTokenResponse } from "@/lib/toolResponse.types";
import { cn } from '@/lib/utils'
import Spinner from '@/components/ui/Spinner'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import NoFileSelected from './NoFileSelected'
import AudioPlayer from './AudioPlayer'
import VideoPlayer from './VideoPlayer'

const MediaUpload = () => {
  const { fileUpload, loading, error, blurImageUrl } = useFileUploadProvider()
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider()
  const { context, scrollDown } = useToolCallProvider()
  const status = context?.status
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollDown()
  })

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const renderMedia = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center left-0 top-0">
          <Spinner />
        </div>
      )
    }

    if (mimeType.includes('audio')) {
      return <AudioPlayer onClick={handleImageClick} />
    }

    if (mimeType.includes('video')) {
      return <VideoPlayer onClick={handleImageClick} />
    }

    if (imageUri) {
      return (
        <div className="relative w-[296px] h-[296px]">
          <Image
            src={blurImageUrl || getIpfsLink(imageUri)}
            className="w-full h-auto rounded-md cursor-pointer object-contain absolute"
            alt="Image Preview"
            onClick={handleImageClick}
            blurDataURL={blurImageUrl}
            layout="fill"
          />
        </div>
      )
    }

    return <NoFileSelected onClick={handleImageClick} />
  }

  return (
    <div className="grid w-full max-w-3xl items-center gap-4 pl-3">
      <div
        className={cn(
          'relative rounded-md min-h-[300px] w-[300px]',
          !imageUri && !animationUri && 'aspect-square',
          (loading || (!imageUri && !animationUri)) && 'border-dashed border-2 border-black',
        )}
      >
        <input
          ref={fileInputRef}
          id="media"
          type="file"
          className="hidden"
          onChange={fileUpload}
          accept={`${status === CreateTokenResponse.MISSING_THUMBNAIL ? "image/*" : "image/*, audio/*, video/*"}`}
        />
        {renderMedia()}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MediaUpload
