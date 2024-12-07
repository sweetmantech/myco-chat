import { usePrivy } from '@privy-io/react-auth';
import { Address, getAddress } from 'viem';

const usePrivyAddress = (): { address: Address | undefined } => {
  const { user } = usePrivy()
  return { address: user?.wallet?.address ? getAddress(user.wallet.address) : undefined }
}

export default usePrivyAddress;
