"use client";

import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";

interface TelegramWebAppSignInProps {
  callbackUrl?: string;
}

/**
 * Uses @twa-dev/sdk to access Telegram Mini App APIs, sends `initData` to NextAuth
 * for server-side verification.
 */
export function TelegramWebAppSignIn({ callbackUrl = "/" }: TelegramWebAppSignInProps) {
  const signInStarted = useRef(false);
  const [phase, setPhase] = useState<"loading" | "signing-in" | "browser" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { default: WebApp } = await import("@twa-dev/sdk");

      if (cancelled) return;

      WebApp.ready();
      WebApp.expand();

      const initData = WebApp.initData;
      if (!initData?.length) {
        setPhase("browser");
        return;
      }

      setPhase("signing-in");
      if (signInStarted.current) return;
      signInStarted.current = true;

      const result = await signIn("telegram", {
        initData,
        callbackUrl,
        redirect: false,
      });

      if (cancelled) return;

      if (result?.error) {
        setPhase("error");
        return;
      }

      if (result?.ok) {
        window.location.href = result.url ?? callbackUrl;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [callbackUrl]);

  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME?.replace(/^@/, "");

  if (phase === "loading" || phase === "signing-in") {
    return (
      <p className="text-sm text-muted-foreground">
        {phase === "loading" ? "Loading Telegram…" : "Signing in…"}
      </p>
    );
  }

  if (phase === "error") {
    return (
      <p className="text-sm text-destructive">
        Could not verify Telegram session. Close the app and open it again from the bot.
      </p>
    );
  }

  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p>
        Sign in by opening this site as a{" "}
        <span className="text-foreground">Telegram Mini App</span> from your bot (not in a
        regular browser tab).
      </p>
      {botUsername ? (
        <a
          href={`https://t.me/${botUsername}`}
          className="inline-flex font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open @{botUsername}
        </a>
      ) : (
        <p className="text-xs">Set NEXT_PUBLIC_TELEGRAM_BOT_USERNAME for a bot link.</p>
      )}
    </div>
  );
}
