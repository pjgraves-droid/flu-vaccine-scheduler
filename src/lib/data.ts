export type Clinic = {
  id: string;
  name: string;
  address: string;
  suburb: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  nextAvailable: string;
  tags: string[];
  hours: string;
};

export type VaccineType = {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  price: string;
};

export const clinics: Clinic[] = [
  {
    id: "c1",
    name: "Harbourside Medical Centre",
    address: "12 Quay Street",
    suburb: "Circular Quay, NSW 2000",
    distanceKm: 0.8,
    rating: 4.9,
    reviews: 312,
    nextAvailable: "Today, 2:30 PM",
    tags: ["Walk-ins welcome", "Bulk billed", "Wheelchair access"],
    hours: "Mon–Fri 7am–8pm, Sat 8am–4pm",
  },
  {
    id: "c2",
    name: "Priceline Pharmacy Pitt St",
    address: "255 Pitt Street",
    suburb: "Sydney, NSW 2000",
    distanceKm: 1.2,
    rating: 4.7,
    reviews: 189,
    nextAvailable: "Today, 4:15 PM",
    tags: ["Pharmacist-administered", "Open late"],
    hours: "Mon–Sun 8am–9pm",
  },
  {
    id: "c3",
    name: "Surry Hills Family Practice",
    address: "48 Crown Street",
    suburb: "Surry Hills, NSW 2010",
    distanceKm: 2.4,
    rating: 4.8,
    reviews: 421,
    nextAvailable: "Tomorrow, 9:00 AM",
    tags: ["Kids friendly", "Bulk billed", "Parking"],
    hours: "Mon–Fri 8am–6pm",
  },
  {
    id: "c4",
    name: "Barangaroo Health Hub",
    address: "3 Sussex Street",
    suburb: "Barangaroo, NSW 2000",
    distanceKm: 1.6,
    rating: 4.6,
    reviews: 98,
    nextAvailable: "Tomorrow, 11:30 AM",
    tags: ["Corporate programs", "Wheelchair access"],
    hours: "Mon–Fri 7am–7pm",
  },
  {
    id: "c5",
    name: "Newtown Community Clinic",
    address: "196 King Street",
    suburb: "Newtown, NSW 2042",
    distanceKm: 4.9,
    rating: 4.8,
    reviews: 267,
    nextAvailable: "Thu, 10:00 AM",
    tags: ["Bulk billed", "Kids friendly", "Open weekends"],
    hours: "Mon–Sun 8am–6pm",
  },
];

export const vaccineTypes: VaccineType[] = [
  {
    id: "standard",
    name: "Standard quadrivalent",
    description: "Protects against four strains of influenza. Suitable for most adults and children over 6 months.",
    ageGroup: "6 months+",
    price: "Free (NIP eligible) or $25",
  },
  {
    id: "enhanced",
    name: "Enhanced (65+)",
    description: "Adjuvanted formula that produces a stronger immune response in older adults.",
    ageGroup: "65 years+",
    price: "Free",
  },
  {
    id: "pediatric",
    name: "Paediatric",
    description: "Lower-dose formulation for infants and young children.",
    ageGroup: "6 months – 5 years",
    price: "Free",
  },
];

export const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

export function upcomingDays(count = 14): Date[] {
  const days: Date[] = [];
  const start = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export function formatDate(d: Date, opts?: Intl.DateTimeFormatOptions) {
  return d.toLocaleDateString("en-AU", opts ?? { weekday: "short", day: "numeric", month: "short" });
}
