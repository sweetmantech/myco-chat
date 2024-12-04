'use client'

import Button from '@/components/Button'
import { usePrivy } from '@privy-io/react-auth'

export default function LoginButton() {
  const { login, logout, authenticated, ready } = usePrivy()

  if (!ready) {
    return <Button disabled>Loading...</Button>
  }

  return (
    <Button onClick={authenticated ? logout : login}>
      {authenticated ? 'Disconnect' : 'Connect'}
    </Button>
  )
}
