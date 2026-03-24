"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * City filter: updates `?city=` in the URL so results are shareable and bookmarkable.
 */
export function ParcelFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("city") ?? "";
  const [value, setValue] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const apply = useCallback(() => {
    const next = new URLSearchParams(searchParams.toString());
    const q = value.trim();
    if (q) next.set("city", q);
    else next.delete("city");
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `/parcels?${qs}` : "/parcels");
    });
  }, [router, searchParams, value]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="grid w-full gap-2 sm:max-w-sm">
        <Label htmlFor="city-filter">Filter by city</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="city-filter"
              placeholder="e.g. Seoul, Busan"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && apply()}
              className="pl-9"
            />
          </div>
          <Button type="button" onClick={apply} disabled={isPending}>
            Apply
          </Button>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="sm:mb-0.5"
        onClick={() => {
          setValue("");
          startTransition(() => router.push("/parcels"));
        }}
        disabled={isPending}
      >
        Clear
      </Button>
    </div>
  );
}
