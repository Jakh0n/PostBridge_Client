import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          That route does not exist or was removed.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </PageShell>
  );
}
