import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ParcelDetail } from "@/features/parcels/parcel-detail";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Parcel details",
    description: `Parcel listing ${id}`,
  };
}

export default async function ParcelDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <PageShell>
      <ParcelDetail id={id} />
    </PageShell>
  );
}
