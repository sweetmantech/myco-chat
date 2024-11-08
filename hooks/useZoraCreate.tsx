'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSwitchChain } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { Address } from 'viem'
import { PROFILE_APP_URL } from '@/lib/consts'
import handleTxError from '@/lib/handleTxError'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import useCreateSuccess from '@/hooks/useCreateSuccess'
import useZoraCreateParameters from './useZoraCreateParameters'
import useCreatorAddress from './useCreatorAddress'
import useConnectWallet from './useConnectWallet'

export default function useZoraCreate() {
  const { push } = useRouter()
  const { address } = useConnectWallet()
  const { getCapabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { switchChainAsync } = useSwitchChain()
  const [creating, setCreating] = useState<boolean>(false)
  const params = useParams()
  const creatorAddress = useCreatorAddress()

  const collection = params.collection as Address | undefined
  const { fetchParameters, createMetadata } = useZoraCreateParameters(collection)

  useCreateSuccess(
    callsStatusId,
    () => push(`${PROFILE_APP_URL}/${creatorAddress}`),
    !!params.collection,
  )

  const create = async (chainId: number) => {
    setCreating(true)
    try {
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
