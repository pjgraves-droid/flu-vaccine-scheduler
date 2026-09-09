import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <Shield className="h-4 w-4" />
            </span>
            FluShield
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-500">
            Fast, free flu vaccination bookings at trusted clinics and pharmacies near you.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/book" className="hover:text-slate-900">Book a vaccine</Link></li>
            <li><Link href="/manage" className="hover:text-slate-900">Manage booking</Link></li>
            <li><Link href="/#faq" className="hover:text-slate-900">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
            <li><a href="#" className="hover:text-slate-900">Terms</a></li>
            <li><a href="#" className="hover:text-slate-900">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} FluShield. Design prototype — not a medical service.
      </div>
    </footer>
  );
}
