// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getZoraPfpLink = (profile: any) => {
    if (profile?.avatar && profile.avatar.startsWith("/")) {
      return `https://zora.co/api/avatar/${profile.address}`
    }
    return profile.avatar
}

export default getZoraPfpLink
