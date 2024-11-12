import { Address, isAddress } from 'viem'
import { usePublicClient } from 'wagmi'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { REFERRAL_RECIPIENT } from '@/lib/consts'
import { useProfileProvider } from '@/providers/ProfileProvider'
import useCreateMetadata from '@/hooks/useCreateMetadata'
import useCreatorAddress from './useCreatorAddress'
import useConnectWallet from './useConnectWallet'

const useZoraCreateParameters = (collection: Address | undefined) => {
  const publicClient = usePublicClient()
  const { address } = useConnectWallet()
  const { profile } = useProfileProvider()
  const createMetadata = useCreateMetadata()
  const creatorAddress = useCreatorAddress()

  const fetchParameters = async (chainId: number) => {
    if (!publicClient) return
    const creatorClient = createCreatorClient({ chainId, publicClient })
    const { uri: cc0MusicIpfsHash } = await createMetadata.getUri()
    if (!cc0MusicIpfsHash) return
    const connnectedProfileAddress =
      profile?.connectedZoraProfile?.address || profile?.zoraProfile?.address
    const payoutRecipient = connnectedProfileAddress || address

    let newParameters
    if (collection) {
      const { parameters: existingParameters } = await creatorClient.create1155OnExistingContract({
        contractAddress: collection,
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          createReferral: REFERRAL_RECIPIENT,
          payoutRecipient,
        },
        account: creatorAddress!,
      })
      newParameters = existingParameters
    } else {
      const { parameters: newContractParameters } = await creatorClient.create1155({
        contract: {
          name: createMetadata.name,
          uri: cc0MusicIpfsHash,
        },
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          createReferral: REFERRAL_RECIPIENT,
          payoutRecipient,
        },
        account: creatorAddress!,
      })
      newParameters = { ...newContractParameters, functionName: 'createContract' }
    }

    return newParameters
  }

  return { createMetadata, fetchParameters }
}

export default useZoraCreateParameters
