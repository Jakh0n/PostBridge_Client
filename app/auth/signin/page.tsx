import { PageShell } from "@/components/page-shell";
import { TelegramLoginButton } from "@/components/telegram-login-button";

export const metadata = {
  title: "Sign in",
};

interface SignInPageProps {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams?.callbackUrl || "/profile";

  return (
    <PageShell>
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center py-8 sm:py-12">
        <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Sign in
              </h1>
              <p className="text-sm text-muted-foreground">
                Access your parcel account using Telegram
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background p-4">
              <TelegramLoginButton callbackUrl={callbackUrl} />
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Fast · Secure · No password required
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
