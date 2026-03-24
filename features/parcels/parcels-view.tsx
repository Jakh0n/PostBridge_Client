"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, PackageOpen } from "lucide-react";
import { ParcelCard } from "@/features/parcels/parcel-card";
import { ParcelFilters } from "@/features/parcels/parcel-filters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParcels } from "@/hooks/useParcels";
import { getApiErrorMessage } from "@/services/api";

function ParcelsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border p-6">
          <Skeleton className="mb-4 h-5 w-32" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function ParcelsView() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") ?? undefined;
  const { data, isLoading, isError, error, refetch, isFetching } =
    useParcels(city);

  return (
    <div className="space-y-8">
      <ParcelFilters />
      {isLoading ? <ParcelsSkeleton /> : null}
      {isError ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/40 bg-destructive/5 px-6 py-12 text-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Could not load parcels</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {getApiErrorMessage(error)}
            </p>
          </div>
          <Button type="button" variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : null}
      {!isLoading && !isError && data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <PackageOpen className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="font-medium">No parcels yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {city
                ? `Nothing matches “${city}”. Try another city or post a new route.`
                : "Be the first to list a parcel route."}
            </p>
          </div>
        </div>
      ) : null}
      {!isLoading && !isError && data && data.length > 0 ? (
        <div>
          {isFetching && !isLoading ? (
            <p className="mb-4 text-sm text-muted-foreground">Updating…</p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            {data.map((p) => (
              <ParcelCard key={p.id} parcel={p} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
