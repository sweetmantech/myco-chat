import { Address } from "viem";

export type ZoraProfile = {
  address: Address
  wallets: Address[]
  addressShort: string
  avatar: string
  username: string | null
  displayName: string | null
  ensName: string | null
  handle: string | null
  profileId: string
  profileName: string
  ensRecords: null
  description: string | null
  totalFollowers: number
  totalFollowing: number
}

export type PROFILE = {
  isPro: boolean
  zoraProfile: ZoraProfile
  connectedZoraProfile: ZoraProfile | null
}

export type METADATA_TYPE = {
  name: string
  description: string
  image: string
  content?: {
    uri: string
    mime: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: any[]
  animation_url?: string
}

export type COLLECTION_TYPE = {
  tokensCreated: number
  address: Address
  chainId: number
  metadata: METADATA_TYPE
}
