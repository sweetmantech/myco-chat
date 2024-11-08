'use client'

import React, { createContext, useContext } from 'react'
import { base } from 'viem/chains'
import { useCapabilities } from 'wagmi/experimental'
import useConnectWallet from '@/hooks/useConnectWallet'

const PaymasterContext = createContext<any>({})

const PaymasterProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useConnectWallet()

  const { data: availableCapabilities } = useCapabilities({
    account: address,
  })

  const getCapabilities = (chainId: number) => {
    if (!availableCapabilities || !chainId) return {}
    const capabilitiesForChain = availableCapabilities[chainId]
    if (
      capabilitiesForChain['paymasterService'] &&
      capabilitiesForChain['paymasterService'].supported
    ) {
      return {
        paymasterService: {
          url: `https://api.developer.coinbase.com/rpc/v1/${chainId === base.id ? 'base' : 'base-sepolia'}/${process.env.NEXT_PUBLIC_PAYMASTER_SERVICE_KEY}`,
        },
      }
    }
    return {}
  }

  return (
    <PaymasterContext.Provider value={{ getCapabilities }}>{children}</PaymasterContext.Provider>
  )
}

const usePaymasterProvider = () => {
  const context = useContext(PaymasterContext)
  if (!context) {
    throw new Error('usePaymaster must be used within a PaymasterProvider')
  }
  return context
}

export { PaymasterProvider, usePaymasterProvider }
