import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/providers/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import manifest from "@/public/manifest.json";
import { AI } from "./api/tool_call/route";

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
    <AI>

    <html lang="en" className="font-nounish overflow-hidden">
      <body>
        <Providers>
          <Header />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
    </AI>
  );
}
