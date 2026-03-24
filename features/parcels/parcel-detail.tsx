"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParcel } from "@/hooks/useParcel";
import { getApiErrorMessage } from "@/services/api";
import { formatKrw, formatParcelRole, formatParcelType } from "@/utils/format";

interface ParcelDetailProps {
  id: string;
}

export function ParcelDetail({ id }: ParcelDetailProps) {
  const { data, isLoading, isError, error, refetch } = useParcel(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-6 py-10 text-center">
        <p className="font-medium text-destructive">Parcel not found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {getApiErrorMessage(error)}
        </p>
        <Button className="mt-4" variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const tel = data.contact.phone?.replace(/\s/g, "");
  const tg = data.contact.telegram?.replace(/^@/, "");

  return (
    <div className="space-y-8">
      <Button variant="ghost" className="-ml-2 gap-2" asChild>
        <Link href="/parcels">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Route</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {data.from}
            <span className="mx-2 text-muted-foreground">→</span>
            {data.to}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Asking price</p>
          <p className="text-2xl font-semibold tabular-nums text-primary">
            {formatKrw(data.price)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge>{formatParcelRole(data.role)}</Badge>
        <Badge>{formatParcelType(data.parcelType)}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>
            Posted{" "}
            {new Date(data.createdAt).toLocaleString("ko-KR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-2 rounded-lg border border-border/70 bg-muted/20 p-3 text-sm sm:grid-cols-2">
            {data.role === "sender" ? (
              <>
                <p>
                  <span className="text-muted-foreground">Weight:</span>{" "}
                  {data.weightKg ?? "-"} kg
                </p>
                <p>
                  <span className="text-muted-foreground">Delivery date:</span>{" "}
                  {data.date || "-"}
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="text-muted-foreground">Available date:</span>{" "}
                  {data.availableDate || "-"}
                </p>
                <p>
                  <span className="text-muted-foreground">Vehicle:</span>{" "}
                  {data.vehicleType
                    ? formatParcelType(data.vehicleType)
                    : "-"}
                </p>
              </>
            )}
          </div>
          <p className="whitespace-pre-wrap text-muted-foreground">
            {data.description?.trim() || "No additional description."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Contact {data.role === "sender" ? "sender" : "courier"}
          </CardTitle>
          <CardDescription>
            Reach out on Telegram or phone to coordinate pickup and delivery.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          {data.contact.phone ? (
            <Button className="gap-2" asChild>
              <a href={`tel:${tel}`}>
                <Phone className="h-4 w-4" />
                Call {data.contact.phone}
              </a>
            </Button>
          ) : null}
          {tg ? (
            <Button variant="secondary" className="gap-2" asChild>
              <a
                href={`https://t.me/${tg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Telegram
              </a>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
