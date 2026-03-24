import Link from "next/link";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import { cn } from "@/lib/utils";

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package2 className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden sm:inline">Korea Parcel Market</span>
        </Link>
        <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" asChild>
            <Link href="/parcels">Parcels</Link>
          </Button>
          <Button asChild>
            <Link href="/parcels/create">Post a parcel</Link>
          </Button>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
