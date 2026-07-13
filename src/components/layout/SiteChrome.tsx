"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/oliver", label: "Oliver" },
  { href: "/studios", label: "Spaces" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book" },
];

export function SiteChrome() {
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsCollapsed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        data-testid="site-nav"
        className={`fixed top-0 left-0 z-40 flex w-full items-center border-b border-white/10 bg-black/85 px-5 backdrop-blur transition-all duration-300 sm:px-10 ${
          isCollapsed ? "h-[68px] sm:h-[80px]" : "h-[110px] sm:h-[140px]"
        }`}
      >
        <Link href="/" aria-label="Go to home page" className="inline-flex items-center gap-4" data-testid="nav-home-logo">
          <Image
            src="/logo-mark-bw.png"
            alt="Oli Cinematics logo"
            width={280}
            height={280}
            priority
            className={`object-contain transition-all duration-300 ${
              isCollapsed ? "h-[42px] w-[42px] sm:h-[52px] sm:w-[52px]" : "h-[76px] w-[76px] sm:h-[104px] sm:w-[104px]"
            }`}
          />
          <span
            className={`hidden sm:inline-flex flex-col leading-tight transition-opacity duration-300 ${
              isCollapsed ? "opacity-80" : "opacity-100"
            }`}
          >
            <span className="text-[10px] tracking-[0.42em] text-white/60 uppercase">Oli Cinematics</span>
            <span className="text-lg tracking-[0.24em] uppercase" style={{ fontFamily: "var(--font-playfair)" }}>
              Production
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className={`text-[11px] tracking-[0.32em] uppercase transition-colors ${
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/book"
            className="btn-primary !py-3 !px-5 !text-[10px]"
            data-testid="nav-book-btn"
          >
            Reserve
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          data-testid="nav-menu-toggle"
          className="ml-auto lg:hidden flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-white/25 bg-black/60 transition hover:border-white"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`h-[1.5px] w-4 bg-white transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-4 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-[1.5px] w-4 bg-white transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <nav
        data-testid="nav-mobile-menu"
        className={`fixed right-5 z-40 w-[240px] border border-white/10 bg-[#0a0a0a] py-2 shadow-2xl transition-all duration-300 lg:hidden ${
          isCollapsed ? "top-[74px] sm:top-[88px]" : "top-[118px] sm:top-[150px]"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-testid={`nav-mobile-link-${item.label.toLowerCase()}`}
            onClick={() => setOpen(false)}
            className="block px-6 py-4 text-[11px] tracking-[0.32em] text-white/80 uppercase transition hover:bg-white/5 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
