import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { ParcelsView } from "@/features/parcels/parcels-view";

function ParcelsFallback() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-6">
            <Skeleton className="mb-4 h-5 w-32" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ParcelsPage() {
  return (
    <PageShell
      title="Parcel listings"
      description="Browse open routes across Korea. Use the city filter to narrow results."
    >
      <Suspense fallback={<ParcelsFallback />}>
        <ParcelsView />
      </Suspense>
    </PageShell>
  );
}
