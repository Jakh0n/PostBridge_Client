"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParcel } from "@/services/parcels";
import type { CreateParcelInput } from "@/types/parcel";

/**
 * Creates a parcel and invalidates the parcels list cache on success.
 */
export function useCreateParcel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateParcelInput) => createParcel(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
  });
}
