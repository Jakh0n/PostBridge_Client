import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Korea · Peer parcel routes
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Send parcels. Find deliverers.{" "}
            <span className="text-primary">Across Korea.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            A lightweight marketplace that matches people who need parcels moved
            with people already traveling or offering local delivery—starting with
            listings and direct contact (Telegram or phone).
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/parcels">
                Browse parcels
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/parcels/create">Create a listing</Link>
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/30 p-8 shadow-sm">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <ul className="relative space-y-5">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium">City-aware listings</p>
                <p className="text-sm text-muted-foreground">
                  Filter by city to find routes that match your corridor.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Users className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium">Direct contact</p>
                <p className="text-sm text-muted-foreground">
                  Telegram or phone links—no in-app chat required for this MVP.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium">MVP scope</p>
                <p className="text-sm text-muted-foreground">
                  Sign in with Telegram; payments can come later—focus on discovery
                  and coordination.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
