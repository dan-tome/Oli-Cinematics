"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Studios" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
  { href: "/book", label: "Book Now" },
];

export function SiteChrome() {
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCollapsed(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-40 flex w-full items-center border-b border-white/10 bg-[#0d4039] px-6 transition-all duration-300 sm:px-10 ${
          isCollapsed ? "h-[88px]" : "h-[280px]"
        }`}
      >
        <Link href="/" aria-label="Go to home page" className="inline-flex items-center">
          <Image
            src="/logo-mark-final.png"
            alt="Oli Cinematics logo"
            width={280}
            height={280}
            priority
            className={`object-contain transition-all duration-300 ${
              isCollapsed ? "h-[59px] w-[59px]" : "h-[236px] w-[236px]"
            }`}
          />
        </Link>
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
          <Image
            src={isCollapsed ? "/logo-title-final-2.png" : "/logo-title-final.png"}
            alt="Oli Cinematics Production"
            width={1140}
            height={290}
            className={`w-auto object-contain transition-all duration-300 ${
              isCollapsed ? "h-[59px]" : "h-[86px] sm:h-[110px]"
            }`}
          />
        </div>
      </nav>

      <div
        className={`fixed right-[25px] z-50 transition-all duration-300 ${
          isCollapsed ? "top-[22px]" : "top-[120px]"
        }`}
      >
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-[45px] w-[45px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-white/30 bg-black/20"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="h-1 w-1 rounded-full bg-white" />
          <span className="h-1 w-1 rounded-full bg-white" />
          <span className="h-1 w-1 rounded-full bg-white" />
        </button>
      </div>

      <nav
        className={`fixed right-[25px] z-40 w-[220px] border border-white/10 bg-[#0a3631] py-2 shadow-2xl transition-all duration-300 ${
          isCollapsed ? "top-[74px]" : "top-[152px]"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2.5 opacity-0"}`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="block px-6 py-4 text-xs tracking-[0.25em] text-white/80 uppercase hover:bg-white/5 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
