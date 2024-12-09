import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/providers/Providers";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Myco Chat",
  description: "Intelligent assistants for your digital art. Zora compatible. Styled with tailwindcss. Copy and paste. Open Source. Based.",
  themeColor: "#F2E8CC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-nounish overflow-hidden">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F2E8CC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
