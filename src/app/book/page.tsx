import { Suspense } from "react";
import { BookingWizard } from "@/components/BookingWizard";

export default function BookPage() {
  return (
    <Suspense>
      <BookingWizard />
    </Suspense>
  );
}
