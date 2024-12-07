import { usePrivy } from '@privy-io/react-auth';

const useConnectWallet = () => {
  const { login } = usePrivy();
  return {
    connectWallet: login,
  };
};

export default useConnectWallet;