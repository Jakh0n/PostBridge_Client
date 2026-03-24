/** Formats a number as Korean Won for display. */
export function formatKrw(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Human-readable label for stored parcel type keys. */
export function formatParcelType(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatParcelRole(role: "sender" | "courier"): string {
  return role === "sender" ? "Sender request" : "Courier offer";
}
