import Link from "next/link";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <nav className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/30">
              <Shield className="h-4 w-4" />
            </span>
            FluShield
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <Link href="/#how-it-works" className="hover:text-slate-900 transition">How it works</Link>
            <Link href="/#clinics" className="hover:text-slate-900 transition">Clinics</Link>
            <Link href="/#faq" className="hover:text-slate-900 transition">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/manage" className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900 transition">
              Manage booking
            </Link>
            <Link
              href="/book"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
            >
              Book now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
