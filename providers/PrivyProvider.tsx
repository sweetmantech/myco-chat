import { PrivyProvider as Provider } from '@privy-io/react-auth'
import { ReactNode } from 'react'
import { base } from 'viem/chains'

const PrivyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
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