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
  description:
    "Film & photography studio hire in Wembley, London — a seamless white infinity cove and four flexible panel-set spaces, each bookable individually.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo-mark-bw.png",
    shortcut: "/logo-mark-bw.png",
    apple: "/logo-mark-bw.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oli Cinematics",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
        <footer className="border-t border-white/10 bg-black px-6 py-8 text-center">
          <p className="text-[10px] tracking-[0.42em] text-white/70 uppercase">Oli Cinematics · Built by Daniel</p>
          <p className="mt-2 text-[10px] tracking-[0.24em] text-white/40 uppercase">
            v{buildVersion} · {currentYear}
          </p>
          <InstallAppButton />
        </footer>
      </body>
    </html>
  );
}
