"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/developers", label: "Developers" },
  { href: "/research", label: "Research" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-surface-900/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            AD
          </div>
          <span className="text-lg font-semibold text-white">AutoDoc</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? "font-medium text-brand-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/demo" className="btn-primary text-xs sm:text-sm">
          Try Demo
        </Link>
      </div>
    </header>
  );
}
