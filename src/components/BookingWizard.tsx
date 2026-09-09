"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Search,
  Star,
  Syringe,
  CalendarDays,
  User,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clinics, vaccineTypes, timeSlots, upcomingDays, formatDate, type Clinic } from "@/lib/data";

const steps = [
  { label: "Clinic", icon: MapPin },
  { label: "Vaccine", icon: Syringe },
  { label: "Time", icon: CalendarDays },
  { label: "Details", icon: User },
  { label: "Review", icon: ClipboardCheck },
];

type Details = { firstName: string; lastName: string; dob: string; email: string; phone: string; medicare: string };

export function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(params.get("clinic") ? 1 : 0);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [clinicId, setClinicId] = useState<string | null>(params.get("clinic"));
  const [vaccineId, setVaccineId] = useState<string>("standard");
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({ firstName: "", lastName: "", dob: "", email: "", phone: "", medicare: "" });

  const days = useMemo(() => upcomingDays(14), []);
  const clinic = clinics.find((c) => c.id === clinicId) ?? null;
  const vaccine = vaccineTypes.find((v) => v.id === vaccineId)!;
  const filtered = clinics.filter((c) =>
    `${c.name} ${c.suburb} ${c.address}`.toLowerCase().includes(query.toLowerCase())
  );

  const canNext = [
    !!clinicId,
    !!vaccineId,
    !!time,
    details.firstName && details.lastName && details.dob && details.email,
    true,
  ][step];

  function confirm() {
    const q = new URLSearchParams({
      clinic: clinic?.name ?? "",
      address: `${clinic?.address}, ${clinic?.suburb}`,
      vaccine: vaccine.name,
      date: formatDate(days[dayIdx], { weekday: "long", day: "numeric", month: "long" }),
      time: time ?? "",
      name: `${details.firstName} ${details.lastName}`,
      email: details.email,
    });
    router.push(`/confirmation?${q.toString()}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Stepper */}
      <ol className="flex items-center justify-between gap-2">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.label} className="flex flex-1 items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition",
                  active && "bg-slate-900 text-white shadow-lg shadow-slate-900/10",
                  done && "bg-brand-50 text-brand-700 hover:bg-brand-100",
                  !active && !done && "text-slate-400"
                )}
              >
                <span className={cn("grid h-5 w-5 place-items-center rounded-full", active ? "bg-white/15" : done ? "bg-brand-600 text-white" : "bg-slate-200")}>
                  {done ? <Check className="h-3 w-3" /> : <s.icon className="h-3 w-3" />}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className={cn("h-px flex-1", done ? "bg-brand-300" : "bg-slate-200")} />}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main panel */}
        <div className="animate-fade-up" key={step}>
          {step === 0 && (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Choose a clinic</h1>
              <p className="mt-2 text-slate-600">Showing clinics near <span className="font-medium text-slate-900">Sydney CBD</span>.</p>
              <label className="card mt-6 flex items-center gap-3 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, suburb or postcode"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
              <div className="mt-4 space-y-3">
                {filtered.map((c) => (
                  <ClinicCard key={c.id} clinic={c} selected={c.id === clinicId} onSelect={() => setClinicId(c.id)} />
                ))}
                {filtered.length === 0 && (
                  <div className="card p-10 text-center text-sm text-slate-500">No clinics match “{query}”.</div>
                )}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Select a vaccine</h1>
              <p className="mt-2 text-slate-600">Not sure? The standard option suits most people.</p>
              <div className="mt-6 grid gap-3">
                {vaccineTypes.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVaccineId(v.id)}
                    className={cn(
                      "card flex items-start gap-4 p-5 text-left transition hover:shadow-lg",
                      vaccineId === v.id && "ring-2 ring-brand-500 border-transparent"
                    )}
                  >
                    <Radio checked={vaccineId === v.id} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-slate-900">{v.name}</h3>
                        <span className="text-sm font-medium text-brand-700">{v.price}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{v.description}</p>
                      <span className="mt-3 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">Ages {v.ageGroup}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Pick a time</h1>
              <p className="mt-2 text-slate-600">All times shown in local clinic time.</p>
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                {days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => { setDayIdx(i); setTime(null); }}
                    className={cn(
                      "flex min-w-[68px] flex-col items-center rounded-2xl border px-3 py-3 text-sm transition",
                      i === dayIdx
                        ? "border-transparent bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    )}
                  >
                    <span className="text-[11px] uppercase opacity-70">{formatDate(d, { weekday: "short" })}</span>
                    <span className="mt-1 text-lg font-semibold">{d.getDate()}</span>
                    <span className="text-[11px] opacity-70">{formatDate(d, { month: "short" })}</span>
                  </button>
                ))}
              </div>
              <div className="card mt-4 p-5">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {timeSlots.map((t, i) => {
                    const taken = (i * 7 + dayIdx * 3) % 5 === 0;
                    return (
                      <button
                        key={t}
                        disabled={taken}
                        onClick={() => setTime(t)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-sm transition",
                          taken && "cursor-not-allowed border-transparent bg-slate-50 text-slate-300 line-through",
                          !taken && time !== t && "border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-700",
                          time === t && "border-transparent bg-brand-600 text-white shadow-md shadow-brand-600/30"
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Your details</h1>
              <p className="mt-2 text-slate-600">We&apos;ll send your confirmation and QR code here.</p>
              <div className="card mt-6 grid gap-4 p-6 sm:grid-cols-2">
                <Field label="First name" value={details.firstName} onChange={(v) => setDetails({ ...details, firstName: v })} />
                <Field label="Last name" value={details.lastName} onChange={(v) => setDetails({ ...details, lastName: v })} />
                <Field label="Date of birth" type="date" value={details.dob} onChange={(v) => setDetails({ ...details, dob: v })} />
                <Field label="Mobile" type="tel" placeholder="04xx xxx xxx" value={details.phone} onChange={(v) => setDetails({ ...details, phone: v })} />
                <Field label="Email" type="email" className="sm:col-span-2" value={details.email} onChange={(v) => setDetails({ ...details, email: v })} />
                <Field label="Medicare number (optional)" className="sm:col-span-2" placeholder="1234 56789 1" value={details.medicare} onChange={(v) => setDetails({ ...details, medicare: v })} />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Review &amp; confirm</h1>
              <p className="mt-2 text-slate-600">Double-check the details below before confirming.</p>
              <div className="card mt-6 divide-y divide-slate-100">
                <Row label="Clinic" value={`${clinic?.name} — ${clinic?.suburb}`} onEdit={() => setStep(0)} />
                <Row label="Vaccine" value={vaccine.name} onEdit={() => setStep(1)} />
                <Row label="When" value={`${formatDate(days[dayIdx], { weekday: "long", day: "numeric", month: "long" })} at ${time}`} onEdit={() => setStep(2)} />
                <Row label="Patient" value={`${details.firstName} ${details.lastName} · ${details.email}`} onEdit={() => setStep(3)} />
              </div>
              <p className="mt-4 text-xs text-slate-500">
                By confirming you agree to our terms and consent to your details being shared with the clinic.
              </p>
            </>
          )}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={confirm}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-600/25 transition hover:opacity-95"
              >
                Confirm booking <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <aside className="hidden lg:block">
          <div className="card sticky top-28 p-6">
            <h3 className="text-sm font-semibold text-slate-900">Booking summary</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <SummaryItem icon={MapPin} label="Clinic" value={clinic ? clinic.name : "Not selected"} muted={!clinic} />
              <SummaryItem icon={Syringe} label="Vaccine" value={vaccine.name} />
              <SummaryItem icon={CalendarDays} label="Date" value={step >= 2 ? formatDate(days[dayIdx]) : "—"} muted={step < 2} />
              <SummaryItem icon={Clock} label="Time" value={time ?? "—"} muted={!time} />
            </dl>
            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-xs text-brand-800">
              Free cancellation and rescheduling up to 2 hours before your appointment.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ClinicCard({ clinic, selected, onSelect }: { clinic: Clinic; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "card flex w-full items-start gap-4 p-5 text-left transition hover:shadow-lg",
        selected && "ring-2 ring-brand-500 border-transparent"
      )}
    >
      <Radio checked={selected} />
      <div className="flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900">{clinic.name}</h3>
            <p className="text-sm text-slate-500">{clinic.address}, {clinic.suburb}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            <Star className="h-3 w-3 fill-current" /> {clinic.rating} <span className="text-amber-600/60">({clinic.reviews})</span>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{clinic.distanceKm} km away</span>
          <span className="inline-flex items-center gap-1 text-emerald-700"><Clock className="h-3.5 w-3.5" />Next: {clinic.nextAvailable}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {clinic.tags.map((t) => (
            <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{t}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span className={cn("mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition", checked ? "border-brand-600 bg-brand-600" : "border-slate-300")}>
      {checked && <Check className="h-3 w-3 text-white" />}
    </span>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, className }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
      />
    </label>
  );
}

function Row({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-slate-900">{value}</div>
      </div>
      <button onClick={onEdit} className="text-xs font-medium text-brand-700 hover:text-brand-800">Edit</button>
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value, muted }: { icon: typeof MapPin; label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span>
      <div>
        <dt className="text-xs text-slate-500">{label}</dt>
        <dd className={cn("font-medium", muted ? "text-slate-400" : "text-slate-900")}>{value}</dd>
      </div>
    </div>
  );
}
