import { PROFILE } from "../zora.types"

const getZoraPfpLink = (profile: PROFILE) => {
    if (profile.zoraProfile.avatar.startsWith("/")) {
      return `https://zora.co/api/avatar/${profile.zoraProfile.address}`
    }
    return profile.zoraProfile.avatar
}

export default getZoraPfpLink
