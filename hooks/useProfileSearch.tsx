import { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi';
import { ZoraProfile } from '@/lib/zora.types';

const useProfileSearch = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<ZoraProfile[]>([])

  const { address } = useAccount();

  const fetchResults = useCallback(async (query: string) => {
    if (query.length > 0) {
      try {
        const response = await fetch(`https://api.myco.wtf/api/profile?address=0x6e0248e7909CDc4F3Ea2b381473D07953A9490ed`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProfile([data.zoraProfile] as ZoraProfile[])
      } catch (error) {
        console.error('Error fetching profile:', error)
        setProfile([])
      }
    } else {
      setProfile([])
    }
  }, [])

  useEffect(() => {
    if (address) {
      fetchResults(address)
    }
  }, [address, fetchResults])

  return { profile }
}

export default useProfileSearch
