import { PageShell } from "@/components/page-shell";
import { ParcelForm } from "@/features/parcels/parcel-form";

export default function CreateParcelPage() {
  return (
    <PageShell
      title="Post a parcel"
      description="Choose your role first, then post either a sender request or courier offer."
    >
      <ParcelForm />
    </PageShell>
  );
}
