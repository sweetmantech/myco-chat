import { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi';

const useProfileSearch = () => {
  const [profile, setProfile] = useState<any[]>([])

  const { address } = useAccount();

  const fetchResults = useCallback(async (query: string) => {
    if (query.length > 0) {
      try {
        const encodedSearch = encodeURIComponent(query)
        const fetchUrl = `/api/profile?address=${encodedSearch}`
        const response = await fetch(fetchUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProfile([data.zoraProfile])
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
