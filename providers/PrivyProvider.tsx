"use client";

import { PrivyProvider as Provider } from "@privy-io/react-auth";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

const PrivyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default PrivyProvider;
