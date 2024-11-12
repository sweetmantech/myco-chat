import { useProfileProvider } from '@/providers/ProfileProvider'
import useConnectWallet from './useConnectWallet'

const useCreatorAddress = () => {
  const { address } = useConnectWallet()
  const { profile } = useProfileProvider()

  const connnectedProfileAddress = profile?.connectedZoraProfile?.address || profile?.zoraProfile?.address
  const creatorAddress = connnectedProfileAddress || address

  return creatorAddress
}

export default useCreatorAddress
