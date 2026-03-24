"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchParcelById } from "@/services/parcels";

/**
 * Fetches a single parcel by id for detail views.
 */
export function useParcel(id: string) {
  return useQuery({
    queryKey: ["parcel", id],
    queryFn: () => fetchParcelById(id),
    enabled: Boolean(id),
  });
}
