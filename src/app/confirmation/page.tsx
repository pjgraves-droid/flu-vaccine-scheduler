import Link from "next/link";
import { CalendarPlus, Check, Clock, MapPin, QrCode, Share2, Syringe, User } from "lucide-react";

type Props = { searchParams: Record<string, string | undefined> };

export default function ConfirmationPage({ searchParams }: Props) {
  const ref = "FS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const { clinic, address, vaccine, date, time, name, email } = searchParams;

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-16">
      <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 h-96 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl" />

      <div className="animate-fade-up text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">You&apos;re booked, {name?.split(" ")[0] ?? "there"}!</h1>
        <p className="mt-3 text-slate-600">
          A confirmation has been sent to <span className="font-medium text-slate-900">{email ?? "your email"}</span>.
        </p>
      </div>

      <div className="animate-fade-up [animation-delay:120ms] card mt-10 overflow-hidden">
        <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Booking reference</div>
            <div className="font-mono text-lg font-semibold">{ref}</div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">Confirmed</span>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
          <dl className="space-y-4 text-sm">
            <Item icon={MapPin} label="Clinic" value={clinic ?? "—"} sub={address} />
            <Item icon={Clock} label="When" value={`${date ?? "—"} at ${time ?? "—"}`} sub="Please arrive 5 minutes early" />
            <Item icon={Syringe} label="Vaccine" value={vaccine ?? "—"} />
            <Item icon={User} label="Patient" value={name ?? "—"} />
          </dl>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-5 text-center">
            <div className="grid h-32 w-32 place-items-center rounded-xl bg-slate-100 text-slate-400">
              <QrCode className="h-20 w-20" strokeWidth={1.2} />
            </div>
            <p className="mt-3 text-xs text-slate-500">Show this at check-in</p>
          </div>
        </div>
      </div>

      <div className="animate-fade-up [animation-delay:200ms] mt-6 grid gap-3 sm:grid-cols-3">
        <ActionBtn icon={CalendarPlus} label="Add to calendar" />
        <ActionBtn icon={Share2} label="Share" />
        <Link href="/manage" className="card flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 transition hover:shadow-lg">
          Manage booking
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-sm font-medium text-brand-700 hover:text-brand-800">← Back to home</Link>
      </div>
    </div>
  );
}

function Item({ icon: Icon, label, value, sub }: { icon: typeof MapPin; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700"><Icon className="h-4 w-4" /></span>
      <div>
        <dt className="text-xs text-slate-500">{label}</dt>
        <dd className="font-medium text-slate-900">{value}</dd>
        {sub && <dd className="text-xs text-slate-500">{sub}</dd>}
      </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <button className="card flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 transition hover:shadow-lg">
      <Icon className="h-4 w-4 text-brand-600" /> {label}
    </button>
  );
}
