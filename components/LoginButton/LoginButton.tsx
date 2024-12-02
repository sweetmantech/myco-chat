"use client";

import { usePrivy } from "@privy-io/react-auth";
import Button from "@/components/Button";

export default function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();

  if (!ready) return <Button disabled>Loading...</Button>;

  if (authenticated) return <Button onClick={logout}>Disconnect</Button>;

  return <Button onClick={login}>Connect</Button>;
}
