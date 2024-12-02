import { PrivyProvider as Provider } from '@privy-io/react-auth'
import { ReactNode } from 'react'
import { base } from 'viem/chains'

const PrivyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || (() => {
        throw new Error('NEXT_PUBLIC_PRIVY_APP_ID environment variable is required');
      })()}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: base, 
      }}
    >
      {children}
    </Provider>
  )
}

export default PrivyProvider 