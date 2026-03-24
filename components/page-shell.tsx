import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface PageShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/** Shared chrome: header, constrained main, footer. */
export function PageShell({ children, title, description }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          {title ? (
            <header className="mb-8 space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              {description ? (
                <p className="max-w-2xl text-muted-foreground">{description}</p>
              ) : null}
            </header>
          ) : null}
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
