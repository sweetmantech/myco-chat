import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/providers/Providers";
import Head from "next/head";
import manifest from "@/public/manifest.json";

export const metadata: Metadata = {
  title: manifest.name,
  description: manifest.description,
  themeColor: manifest.theme_color,
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
        <meta name="theme-color" content={manifest.theme_color} />
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
