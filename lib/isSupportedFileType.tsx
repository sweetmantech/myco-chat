import { SUPPORTED_FILES } from './consts'

function isSupportedFileType(mimeType: string) {
  return SUPPORTED_FILES.some((type) => mimeType.includes(type))
}

export default isSupportedFileType
