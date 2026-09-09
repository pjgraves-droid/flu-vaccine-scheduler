import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Syringe,
  Users,
  ChevronDown,
} from "lucide-react";
import { clinics } from "@/lib/data";

const steps = [
  {
    icon: MapPin,
    title: "Choose a clinic",
    text: "Search by suburb or postcode and compare nearby clinics and pharmacies.",
  },
  {
    icon: CalendarCheck,
    title: "Pick a time",
    text: "See real-time availability and lock in a slot that fits your day.",
  },
  {
    icon: Syringe,
    title: "Get protected",
    text: "Show your QR code at the clinic. In and out in under 10 minutes.",
  },
];

const faqs = [
  {
    q: "Is the flu vaccine free?",
    a: "Free under the National Immunisation Program for eligible groups (65+, pregnant women, children 6 months–5 years, and people with certain medical conditions). Otherwise typically $20–30.",
  },
  {
    q: "How long does the appointment take?",
    a: "Around 10 minutes including a short observation period after the shot.",
  },
  {
    q: "Can I book for my family?",
    a: "Yes — add multiple patients to a single booking and we'll schedule back-to-back slots.",
  },
  {
    q: "Can I reschedule?",
    a: "Anytime, free of charge, up to 2 hours before your appointment.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/60 via-sky-100/50 to-transparent blur-3xl" />
        <div className="absolute top-[40rem] -right-40 h-[400px] w-[400px] rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-24 text-center">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-brand-800 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          2026 flu season vaccines now available
        </span>
        <h1 className="animate-fade-up [animation-delay:80ms] mt-6 text-balance text-5xl md:text-7xl font-semibold tracking-tight text-slate-900">
          Your flu shot,{" "}
          <span className="bg-gradient-to-r from-brand-600 to-sky-600 bg-clip-text text-transparent">
            booked in 60 seconds.
          </span>
        </h1>
        <p className="animate-fade-up [animation-delay:160ms] mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-600">
          Find a nearby clinic, pick a time that suits you, and walk in with a
          QR code. No phone calls, no waiting rooms.
        </p>

        <div className="animate-fade-up [animation-delay:240ms] mx-auto mt-10 max-w-2xl">
          <form action="/book" className="glass flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl p-2">
            <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 bg-white/60">
              <MapPin className="h-5 w-5 text-brand-600" />
              <input
                name="q"
                placeholder="Enter your suburb or postcode"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-600/25 hover:opacity-95 transition"
            >
              Find clinics <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-500">
            Free for eligible patients · Walk-ins available · 1,200+ locations
          </p>
        </div>

        {/* Stats */}
        <div className="animate-fade-up [animation-delay:320ms] mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur">
          {[
            ["2.4M", "vaccinations booked"],
            ["4.9★", "average rating"],
            ["< 10 min", "average visit"],
          ].map(([v, l]) => (
            <div key={l} className="px-4 py-5">
              <div className="text-2xl md:text-3xl font-semibold text-slate-900">{v}</div>
              <div className="mt-1 text-xs md:text-sm text-slate-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">How it works</h2>
          <p className="mt-3 text-slate-600">Three steps. Zero hassle.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card group relative p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute right-6 top-6 text-5xl font-semibold text-slate-100 group-hover:text-brand-100 transition">
                0{i + 1}
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clinics preview */}
      <section id="clinics" className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">Clinics near you</h2>
            <p className="mt-3 text-slate-600">Real-time availability from trusted providers.</p>
          </div>
          <Link href="/book" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800">
            View all clinics <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clinics.slice(0, 3).map((c) => (
            <Link key={c.id} href={`/book?clinic=${c.id}`} className="card p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{c.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{c.suburb}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                  <Star className="h-3 w-3 fill-current" /> {c.rating}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.distanceKm} km</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.nextAvailable}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.tags.slice(0, 2).map((t) => (
                  <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 md:px-16 text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Trusted by clinics, loved by patients.</h2>
              <p className="mt-4 text-slate-300">
                Every provider on FluShield is accredited and stocks the current-season vaccine. Your health data is encrypted and never sold.
              </p>
              <Link href="/book" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100 transition">
                Book your shot <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                [ShieldCheck, "Accredited providers"],
                [Users, "Family bookings"],
                [Clock, "Instant confirmation"],
                [CalendarCheck, "Free rescheduling"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={label as string} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <I className="h-6 w-6 text-brand-300" />
                    <div className="mt-3 text-sm font-medium">{label as string}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">Questions, answered</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group p-5 open:shadow-xl">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-slate-900">
                {f.q}
                <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
