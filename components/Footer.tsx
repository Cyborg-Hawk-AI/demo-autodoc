import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              AD
            </div>
            <span className="text-lg font-semibold text-white">AutoDoc</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <Link href="/demo" className="transition hover:text-white">
              Live Demo
            </Link>
            <Link href="/developers" className="transition hover:text-white">
              Developer Docs
            </Link>
            <Link href="/research" className="transition hover:text-white">
              How we found this idea
            </Link>
          </nav>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AutoDoc · Mock demo by Idea Miner
          </p>
        </div>
      </div>
    </footer>
  );
}
