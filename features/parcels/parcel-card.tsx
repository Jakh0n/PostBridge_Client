import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Parcel } from "@/types/parcel";
import { formatKrw, formatParcelRole, formatParcelType } from "@/utils/format";

interface ParcelCardProps {
  parcel: Parcel;
}

export function ParcelCard({ parcel }: ParcelCardProps) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{formatParcelRole(parcel.role)}</Badge>
          <Badge variant="secondary">{formatParcelType(parcel.parcelType)}</Badge>
          <span className="text-lg font-semibold tabular-nums text-primary">
            {formatKrw(parcel.price)}
          </span>
        </div>
        <CardTitle className="text-base font-medium leading-snug">
          <span className="flex items-start gap-2 text-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <span>
              {parcel.from}
              <span className="mx-1.5 text-muted-foreground">→</span>
              {parcel.to}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
      {parcel.description ? (
        <CardContent className="pt-0">
          <div className="mb-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {parcel.role === "sender" && parcel.weightKg !== undefined ? (
              <span>Weight: {parcel.weightKg} kg</span>
            ) : null}
            {parcel.role === "sender" && parcel.date ? (
              <span>Date: {parcel.date}</span>
            ) : null}
            {parcel.role === "courier" && parcel.availableDate ? (
              <span>Available: {parcel.availableDate}</span>
            ) : null}
            {parcel.role === "courier" && parcel.vehicleType ? (
              <span>Vehicle: {formatParcelType(parcel.vehicleType)}</span>
            ) : null}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {parcel.description}
          </p>
        </CardContent>
      ) : null}
      <CardFooter className="mt-auto justify-end border-t border-border/60 pt-4">
        <Link
          href={`/parcels/${parcel.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
