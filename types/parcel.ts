export interface ParcelContact {
  phone?: string;
  telegram?: string;
}

export interface Parcel {
  id: string;
  from: string;
  to: string;
  parcelType: string;
  price: number;
  contact: ParcelContact;
  description?: string;
  createdAt: string;
}

export interface CreateParcelInput {
  from: string;
  to: string;
  parcelType: string;
  price: number;
  contact: ParcelContact;
  description?: string;
}
