import { ArrowRight, Mail, Ticket } from "lucide-react";

export default function ManagePage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900">Manage your booking</h1>
      <p className="mt-3 text-center text-slate-600">Enter your reference and email to reschedule or cancel.</p>
      <form className="card mt-8 space-y-4 p-6">
        <label className="block">
          <span className="text-xs font-medium text-slate-600">Booking reference</span>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10">
            <Ticket className="h-4 w-4 text-slate-400" />
            <input placeholder="FS-XXXXXX" className="w-full bg-transparent font-mono text-sm uppercase outline-none" />
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-600">Email</span>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10">
            <Mail className="h-4 w-4 text-slate-400" />
            <input type="email" placeholder="you@example.com" className="w-full bg-transparent text-sm outline-none" />
          </div>
        </label>
        <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">
          Find my booking <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
