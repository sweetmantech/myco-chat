import { useState } from 'react'
import { toast } from 'react-toastify'
import getIsPro from '@/lib/actions/getIsPro'
import { MAX_FILE_SIZE, ONE_MB } from '@/lib/consts'
import getIpfsJwt from '@/lib/getIpfsJwt'
import { uploadFile } from '@/lib/ipfs/uploadFile'
import isSupportedFileType from '@/lib/isSupportedFileType'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import useConnectWallet from './useConnectWallet'

const useFileUpload = () => {
  const { address } = useConnectWallet()
  const { setImageUri, setAnimationUri, setMimeType, animationUri } =
    useZoraCreateProvider()
  const [blurImageUrl, setBlurImageUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setLoading(true)

    try {
      const file = event.target.files?.[0]
      if (!file) throw new Error()
      const { isPro } = await getIsPro(address!)
      const JWT = isPro ? await getIpfsJwt() : undefined

      if (!isPro && file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / ONE_MB}MB.`)
      }
      const mimeType = file.type

      if (!isSupportedFileType(file.type)) {
        toast.error('File type is not supported!')
        setLoading(false)
        return
      }

      const isImage = mimeType.includes('image')

      const { uri } = await uploadFile(file, JWT)
      if (isImage) {
        setImageUri(uri)
        setBlurImageUrl(URL.createObjectURL(file))
        if (!animationUri) {
          setMimeType(mimeType)
        }
      } else {
        setAnimationUri(uri)
        setMimeType(mimeType)
      }
    } catch (error) {
      console.error(error)
      const message = error instanceof Error ? error.message : 'Failed to upload the file. Please try again.';
      setError(message)
    }
    setLoading(false)
  }

  return { fileUpload, loading, error, blurImageUrl }
}

export default useFileUpload
