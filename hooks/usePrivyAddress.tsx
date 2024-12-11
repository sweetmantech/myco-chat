import { usePrivy } from '@privy-io/react-auth';
import { Address, getAddress } from 'viem';

interface UsePrivyAddress {
  address: Address | undefined
}

const usePrivyAddress = (): UsePrivyAddress => {
  const { user } = usePrivy()
  return { address: user?.wallet?.address ? getAddress(user.wallet.address) : undefined }
}

export default usePrivyAddress;
