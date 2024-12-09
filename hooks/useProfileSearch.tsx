import { useState, useCallback, useEffect } from 'react'
import { ZoraProfile } from '@/lib/zora.types';
import usePrivyAddress from './usePrivyAddress';

const useProfileSearch = () => {
  const [profile, setProfile] = useState<ZoraProfile[]>([])

  const { address } = usePrivyAddress();

  const fetchResults = useCallback(async (query: string) => {
    if (query.length > 0) {
      try {
        const response = await fetch(`https://api.myco.wtf/api/profile?address=${query}`)
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
