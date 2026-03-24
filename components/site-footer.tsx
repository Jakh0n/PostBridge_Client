import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-border/60 py-10 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      <p>
        Korea Parcel Marketplace — MVP. No authentication; contact details are
        shared as provided by listers.
      </p>
    </footer>
  );
}
