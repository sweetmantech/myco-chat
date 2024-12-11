'use client'

import Button from '@/components/Button'
import { usePrivy } from '@privy-io/react-auth'

export default function LoginButton() {
  const { login, logout, authenticated, ready } = usePrivy()

  if (!ready) {
    return <Button className="text-sm md:text-base p-2 md:p-3" disabled>Loading...</Button>
  }

  return (
    <Button className="text-sm min-w-[30px] md:w-[153px] md:text-base p-[6px] md:p-5" onClick={authenticated ? logout : login}>
      {authenticated ? 'Disconnect' : 'Connect'}
    </Button>
  )
}