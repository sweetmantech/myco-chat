import { createConfig, http } from 'wagmi'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'
import { base, baseSepolia } from 'viem/chains'

const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    // coinbaseWallet({
    //   appName: 'myco.wtf',
    //   preference: 'smartWalletOnly',
    // }),
    metaMask({}),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

export default wagmiConfig
