export interface ParcelContact {
  phone?: string;
  telegram?: string;
}

export type ParcelRole = "sender" | "courier";

export interface Parcel {
  id: string;
  role: ParcelRole;
  from: string;
  to: string;
  parcelType: string;
  weightKg?: number;
  date?: string;
  availableDate?: string;
  vehicleType?: string;
  price: number;
  contact: ParcelContact;
  description?: string;
  createdAt: string;
}

export interface CreateParcelInput {
  role: ParcelRole;
  from: string;
  to: string;
  parcelType: string;
  weightKg?: number;
  date?: string;
  availableDate?: string;
  vehicleType?: string;
  price: number;
  contact: ParcelContact;
  description?: string;
}
