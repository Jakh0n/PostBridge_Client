import { api } from "./api";
import type { CreateParcelInput, Parcel } from "@/types/parcel";

interface ParcelsResponse {
  success: boolean;
  data: Parcel[];
}

interface ParcelResponse {
  success: boolean;
  data: Parcel;
}

/** Fetches all parcels, optionally filtered by city (matches from or to). */
export async function fetchParcels(city?: string): Promise<Parcel[]> {
  const { data } = await api.get<ParcelsResponse>("/parcels", {
    params: city?.trim() ? { city: city.trim() } : undefined,
  });
  return data.data;
}

/** Creates a new parcel listing. */
export async function createParcel(input: CreateParcelInput): Promise<Parcel> {
  const { data } = await api.post<ParcelResponse>("/parcels", input);
  return data.data;
}

/** Loads a single parcel by MongoDB id. */
export async function fetchParcelById(id: string): Promise<Parcel> {
  const { data } = await api.get<ParcelResponse>(`/parcels/${id}`);
  return data.data;
}

/** Deletes a parcel (admin-style; exposed for completeness). */
export async function deleteParcel(id: string): Promise<void> {
  await api.delete(`/parcels/${id}`);
}
