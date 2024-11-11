'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useSwitchChain } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { Address } from 'viem'
import { CHAIN_ID } from '@/lib/consts'
import handleTxError from '@/lib/handleTxError'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import { useChatProvider } from '@/providers/ChatProvider'
import useCreateSuccess from '@/hooks/useCreateSuccess'
import useZoraCreateParameters from './useZoraCreateParameters'
import useCreatorAddress from './useCreatorAddress'
import useConnectWallet from './useConnectWallet'

export default function useZoraCreate() {
  const { address } = useConnectWallet()
  const { getCapabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { switchChainAsync } = useSwitchChain()
  const { append } = useChatProvider();
  const [creating, setCreating] = useState<boolean>(false)
  const params = useParams()
  const creatorAddress = useCreatorAddress()

  const collection = params.collection as Address | undefined
  const { fetchParameters, createMetadata } = useZoraCreateParameters(collection)

  useCreateSuccess(
    callsStatusId,
    (hash) => append({
      id: `${creatorAddress}-${Date.now()}`,
      role: "user",
      content: `Signed the transaction. Transaction: ${hash}`,
    }),
    !!params.collection,
  )

  const create = async () => {
    setCreating(true)
    try {
      const chainId = CHAIN_ID
      if (!address) {
        throw new Error('No wallet connected')
      }
      await switchChainAsync({ chainId })
      const parameters = await fetchParameters(chainId)

      if (!parameters) {
        throw new Error('Parameters not ready')
      }

      await writeContractsAsync({
        contracts: [{ ...parameters }],
        capabilities: getCapabilities(chainId),
      } as any)
    } catch (err) {
      setCreating(false)
      handleTxError(err)
    }
  }

  return { create, creating, ...createMetadata }
}
