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
