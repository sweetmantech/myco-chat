import { PrivyProvider as Provider } from '@privy-io/react-auth'
import { ReactNode } from 'react'
import { base } from 'viem/chains'

const PrivyProvider = ({ children }: { children: ReactNode }) => {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
  if (!privyAppId) {
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID environment variable is required');
  }

  return (
    <Provider
      appId={privyAppId}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#000',
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