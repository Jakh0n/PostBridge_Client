"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Bike, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PARCEL_TYPES, VEHICLE_TYPES } from "@/lib/constants";
import { useCreateParcel } from "@/hooks/useCreateParcel";
import { getApiErrorMessage } from "@/services/api";
import { cn } from "@/lib/utils";
import type { ParcelRole } from "@/types/parcel";

function RoleSelectCard({
  selectedRole,
  onSelect,
  value,
  title,
  description,
  icon,
}: {
  selectedRole: ParcelRole | null;
  onSelect: (role: ParcelRole) => void;
  value: ParcelRole;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  const active = selectedRole === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "rounded-xl border p-4 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/40 hover:bg-muted/30"
      )}
    >
      <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </button>
  );
}

export function ParcelForm() {
  const router = useRouter();
  const { mutateAsync, isPending, isError, error } = useCreateParcel();

  const [role, setRole] = useState<ParcelRole | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [parcelType, setParcelType] = useState<string>(
    PARCEL_TYPES[0]?.value ?? "document"
  );
  const [weightKg, setWeightKg] = useState("");
  const [date, setDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [vehicleType, setVehicleType] = useState<string>(
    VEHICLE_TYPES[0]?.value ?? "walking"
  );
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [description, setDescription] = useState("");
  const [contactError, setContactError] = useState(false);
  const [roleFieldError, setRoleFieldError] = useState<string | null>(null);

  const isSender = role === "sender";
  const isCourier = role === "courier";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactError(false);
    setRoleFieldError(null);

    if (!role) {
      setRoleFieldError("Choose what you want to do first.");
      return;
    }

    const priceNum = Number(price.replace(/,/g, ""));
    if (Number.isNaN(priceNum) || priceNum < 0) return;

    const weightNum = Number(weightKg.replace(/,/g, ""));
    if (isSender) {
      if (!date.trim()) {
        setRoleFieldError("Sender posts require a preferred delivery date.");
        return;
      }
      if (Number.isNaN(weightNum) || weightNum < 0) {
        setRoleFieldError("Sender posts require a valid weight.");
        return;
      }
    }

    if (isCourier && !availableDate.trim()) {
      setRoleFieldError("Courier posts require an available date.");
      return;
    }

    if (!phone.trim() && !telegram.trim()) {
      setContactError(true);
      return;
    }

    const created = await mutateAsync({
      role,
      from: from.trim(),
      to: to.trim(),
      parcelType: isSender ? parcelType : "other",
      weightKg: isSender ? weightNum : undefined,
      date: isSender ? date.trim() : undefined,
      availableDate: isCourier ? availableDate.trim() : undefined,
      vehicleType: isCourier ? vehicleType : undefined,
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
    <form onSubmit={(e) => void onSubmit(e)} className="mx-auto max-w-2xl space-y-6">
      {!role ? (
        <div className="space-y-3">
          <Label>What do you want to do?</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            <RoleSelectCard
              selectedRole={role}
              onSelect={(r) => {
                setRole(r);
                setRoleFieldError(null);
              }}
              value="sender"
              title="I want to send a parcel"
              description="Post a delivery request as a sender."
              icon={<Package className="h-5 w-5" aria-hidden />}
            />
            <RoleSelectCard
              selectedRole={role}
              onSelect={(r) => {
                setRole(r);
                setRoleFieldError(null);
              }}
              value="courier"
              title="I can deliver a parcel"
              description="Post your delivery availability as a courier."
              icon={
                <span className="flex items-center gap-1">
                  <Bike className="h-4 w-4" aria-hidden />
                  <Truck className="h-4 w-4" aria-hidden />
                </span>
              }
            />
          </div>
        </div>
      ) : null}

      {role ? (
        <>
          <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 px-3 py-2">
            <p className="text-sm text-muted-foreground">
              Selected role:{" "}
              <span className="font-medium text-foreground">
                {isSender ? "Sender" : "Courier"}
              </span>
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setRole(null)}
            >
              Change
            </Button>
          </div>

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

          {isSender ? (
            <div className="space-y-2">
              <Label htmlFor="parcelType">Parcel type</Label>
              <select
                id="parcelType"
                required
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
          ) : null}

          {isSender ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weightKg">Weight (kg)</Label>
                <Input
                  id="weightKg"
                  required
                  inputMode="decimal"
                  placeholder="2.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Preferred date</Label>
                <Input
                  id="date"
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          ) : null}

          {isCourier ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="availableDate">Available date</Label>
                <Input
                  id="availableDate"
                  required
                  type="date"
                  value={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle type</Label>
                <select
                  id="vehicleType"
                  required
                  className={cn(
                    "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
                    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  {VEHICLE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}

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
            Provide at least one contact method so others can reach you.
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

          {roleFieldError ? (
            <p className="text-sm text-destructive" role="alert">
              {roleFieldError}
            </p>
          ) : null}

          {isError ? (
            <p className="text-sm text-destructive" role="alert">
              {getApiErrorMessage(error)}
            </p>
          ) : null}

          <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
            {isPending ? "Publishing…" : "Publish listing"}
          </Button>
        </>
      ) : null}
    </form>
  );
}
