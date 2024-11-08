import { useCallback, useEffect, useState } from 'react'
import { PROFILE } from '@/lib/zora.types'
import { API_APP_URL } from '@/lib/consts'
import useConnectWallet from './useConnectWallet'

const useProfile = () => {
  const [profile, setProfile] = useState<PROFILE | null>(null)
  const { address } = useConnectWallet()

  const fetchResults = useCallback(async (query: string) => {
    if (query.length > 0) {
      try {
        const response = await fetch(`${API_APP_URL}/api/profile?address=${query}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProfile(data as PROFILE)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
      }
    } else {
      setProfile(null)
    }
  }, [])

  useEffect(() => {
    if (!address) return
    fetchResults(address)
  }, [address, fetchResults])

  return {
    profile,
  }
}

export default useProfile
