import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TelegramLoginButton } from "@/components/telegram-login-button";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <PageShell
      title="Sign in"
      description="Secure one-tap access with Telegram."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Fast and secure login
            </div>
            <h2 className="max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
              Continue your parcel workflow in seconds
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                One-tap authentication through official Telegram widget
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                Signature verified server-side using your bot token
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                No password forms, no extra onboarding steps
              </li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">Welcome back</h3>
              <p className="text-sm text-muted-foreground">
                Authorize with Telegram to access your account.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
              <TelegramLoginButton callbackUrl="/profile" />
            </div>

            <p className="text-xs text-muted-foreground">
              New here?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create account
              </Link>
            </p>

            <Button variant="ghost" className="w-full sm:w-auto" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                Back home
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
