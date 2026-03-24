"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PARCEL_TYPES } from "@/lib/constants";
import { useCreateParcel } from "@/hooks/useCreateParcel";
import { getApiErrorMessage } from "@/services/api";
import { cn } from "@/lib/utils";

export function ParcelForm() {
  const router = useRouter();
  const { mutateAsync, isPending, isError, error } = useCreateParcel();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [parcelType, setParcelType] = useState<string>(
    PARCEL_TYPES[0]?.value ?? "document"
  );
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [description, setDescription] = useState("");
  const [contactError, setContactError] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactError(false);
    const priceNum = Number(price.replace(/,/g, ""));
    if (Number.isNaN(priceNum) || priceNum < 0) return;
    if (!phone.trim() && !telegram.trim()) {
      setContactError(true);
      return;
    }

    const created = await mutateAsync({
      from: from.trim(),
      to: to.trim(),
      parcelType,
      price: priceNum,
      contact: {
        phone: phone.trim() || undefined,
        telegram: telegram.trim() || undefined,
      },
      description: description.trim() || undefined,
    });
    router.push(`/parcels/${created.id}`);
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mx-auto max-w-xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="from">From (city / area)</Label>
          <Input
            id="from"
            required
            placeholder="Seoul"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To (city / area)</Label>
          <Input
            id="to"
            required
            placeholder="Busan"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parcelType">Parcel type</Label>
        <select
          id="parcelType"
          className={cn(
            "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          value={parcelType}
          onChange={(e) => setParcelType(e.target.value)}
        >
          {PARCEL_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (KRW)</Label>
        <Input
          id="price"
          required
          inputMode="numeric"
          placeholder="25000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+82 10-0000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telegram">Telegram (optional)</Label>
          <Input
            id="telegram"
            placeholder="@username"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Provide at least one contact method so deliverers can reach you.
      </p>
      {contactError ? (
        <p className="text-sm text-destructive" role="alert">
          Add a phone number or Telegram handle.
        </p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Pickup window, size, weight notes…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {isError ? (
        <p className="text-sm text-destructive" role="alert">
          {getApiErrorMessage(error)}
        </p>
      ) : null}

      <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Publishing…" : "Publish listing"}
      </Button>
    </form>
  );
}
