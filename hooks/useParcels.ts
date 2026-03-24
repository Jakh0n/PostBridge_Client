"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchParcels } from "@/services/parcels";

/**
 * Lists parcels with optional city filter (server-side filter on from/to).
 */
export function useParcels(city?: string) {
  return useQuery({
    queryKey: ["parcels", city?.trim() ?? ""],
    queryFn: () => fetchParcels(city?.trim() || undefined),
  });
}
