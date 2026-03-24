/** Common parcel categories for the create form. */
export const PARCEL_TYPES = [
  { value: "document", label: "Document" },
  { value: "small_box", label: "Small box" },
  { value: "medium_box", label: "Medium box" },
  { value: "large_box", label: "Large box" },
  { value: "fragile", label: "Fragile" },
  { value: "other", label: "Other" },
] as const;

/** Available vehicles for courier listings. */
export const VEHICLE_TYPES = [
  { value: "walking", label: "Walking / Public transit" },
  { value: "bike", label: "Bike" },
  { value: "motorbike", label: "Motorbike" },
  { value: "car", label: "Car" },
  { value: "van", label: "Van" },
  { value: "truck", label: "Truck" },
  { value: "other", label: "Other" },
] as const;
