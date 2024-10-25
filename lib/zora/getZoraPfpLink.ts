import { ZoraProfile } from "../zora.types"

const getZoraPfpLink = (profile: ZoraProfile) => {
    if (profile.avatar.startsWith("/")) {
      return `https://zora.co/api/avatar${profile.address}`
    }
    return profile.avatar
}

export default getZoraPfpLink
