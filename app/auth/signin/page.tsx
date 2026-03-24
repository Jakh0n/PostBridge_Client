import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
      description="Use your Telegram account. We verify the login with your bot token on the server—no Telegram password is stored."
    >
      <div className="max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Click the button below to authorize with Telegram. You need a bot from
          @BotFather and the same bot token configured in your server
          environment.
        </p>
        <TelegramLoginButton callbackUrl="/" />
        <Button variant="ghost" className="w-full sm:w-auto" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back home
          </Link>
        </Button>
      </div>
    </PageShell>
  );
}
