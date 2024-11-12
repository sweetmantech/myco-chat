import { createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { base, baseSepolia, zoraTestnet, zora } from 'viem/chains'

const wagmiConfig = createConfig({
  chains: [base, baseSepolia, zora, zoraTestnet],
  connectors: [
    coinbaseWallet({
      appName: 'myco.wtf',
      // preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [zora.id]: http(),
    [zoraTestnet.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

export default wagmiConfig
