import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useToolCallProvider } from '@/providers/ToolCallProvider';
import { cn } from '@/lib/utils'
import NoFileSelected from './NoFileSelected'

const MediaUpload = () => {
  const { scrollDown } = useToolCallProvider()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string>('')
  const [blurImageUrl, setBlurImageUrl] = useState<string>('')

  const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')

    try {
      const file = event.target.files?.[0]
      if (!file) throw new Error()
      const mimeType = file.type

      const isImage = mimeType.includes('image')

      if (isImage) {
        setBlurImageUrl(URL.createObjectURL(file))
      }
    } catch (error) {
      console.error(error)
      const message = error instanceof Error ? error.message : 'Failed to upload the file. Please try again.';
      setError(message)
    }
  }

  useEffect(() => {
    scrollDown()
  })

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const renderMedia = () => {
    if (blurImageUrl) {
      return (
        <div className="relative w-[296px] h-[296px]">
          <Image
            src={blurImageUrl}
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
          !blurImageUrl && 'aspect-square border-dashed border-2 border-black',
        )}
      >
        <input
          ref={fileInputRef}
          id="media"
          type="file"
          className="hidden"
          onChange={fileUpload}
          accept={"image/*, audio/*, video/*"}
        />
        {renderMedia()}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MediaUpload
