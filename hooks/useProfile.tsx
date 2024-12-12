import { PROFILE } from '@/lib/profile'
import { useEffect, useState } from 'react'
import usePrivyAddress from './usePrivyAddress'

const useProfile = () => {
  const [profile, setProfile] = useState<PROFILE | null>(null)
  const { address } = usePrivyAddress()

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`/api/profile?address=${address}`)
      const data = await response.json()

      setProfile(data)
    }
    if (!address) return
    init()
  }, [address])

  return {
    profile,
  }
}

export default useProfile
