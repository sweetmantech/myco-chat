import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/providers/Providers";
import manifest from "@/public/manifest.json";
import { InstallButton } from "@/components/Button/InstallButton";
import IOSInstallPrompt from '@/components/IOSInstallPrompt';

export const metadata: Metadata = {
  title: manifest.name,
  description: manifest.description,
  themeColor: manifest.theme_color,
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: manifest.name,
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-nounish overflow-hidden">
      <body>
        <Providers>
          <Header />
          {children}
          <InstallButton />
          <IOSInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
