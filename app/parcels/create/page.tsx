import { PageShell } from "@/components/page-shell";
import { ParcelForm } from "@/features/parcels/parcel-form";

export default function CreateParcelPage() {
  return (
    <PageShell
      title="Post a parcel"
      description="Share your route, price, and how deliverers should contact you."
    >
      <ParcelForm />
    </PageShell>
  );
}
