import type { Metadata, Viewport } from "next";
import { InstallAppButton } from "@/src/components/InstallAppButton";
import { Inter, Playfair_Display } from "next/font/google";
import { PwaRegister } from "@/src/components/PwaRegister";
import { buildVersion } from "@/src/generated/build-meta";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oli Cinematics Production",
  description: "Studio booking and portfolio",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo-mark-original.png",
    shortcut: "/logo-mark-original.png",
    apple: "/logo-mark-original.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oli Cinematics",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d4039",
};

const currentYear = new Date().getFullYear();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PwaRegister />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-white/10 bg-[#0a3631] px-6 py-6 text-center">
          <p className="text-xs tracking-[0.22em] text-white/80 uppercase">Built by Daniel</p>
          <p className="mt-2 text-[11px] tracking-[0.12em] text-white/60 uppercase">
            Version {buildVersion} · {currentYear}
          </p>
          <InstallAppButton />
        </footer>
      </body>
    </html>
  );
}
