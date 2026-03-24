"use client";

import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";

/** Payload from https://core.telegram.org/widgets/login */
interface TelegramWidgetUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramWidgetUser) => void;
  }
}

interface TelegramLoginButtonProps {
  callbackUrl?: string;
}

/**
 * Renders the official Telegram Login Widget and signs in via NextAuth Credentials.
 */
export function TelegramLoginButton({
  callbackUrl = "/",
}: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

  useEffect(() => {
    if (!botUsername || !containerRef.current) return;

    const handler = async (user: TelegramWidgetUser) => {
      const payload: Record<string, string> = {
        id: String(user.id),
        first_name: user.first_name,
        auth_date: String(user.auth_date),
        hash: user.hash,
      };
      if (user.last_name) payload.last_name = user.last_name;
      if (user.username) payload.username = user.username;
      if (user.photo_url) payload.photo_url = user.photo_url;

      await signIn("telegram", {
        ...payload,
        callbackUrl,
      });
    };

    window.onTelegramAuth = handler;

    const el = containerRef.current;
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    el.replaceChildren(script);

    return () => {
      delete window.onTelegramAuth;
      el.replaceChildren();
    };
  }, [botUsername, callbackUrl]);

  if (!botUsername) {
    return (
      <p className="text-sm text-muted-foreground">
        Set NEXT_PUBLIC_TELEGRAM_BOT_USERNAME to enable Telegram sign-in.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-[40px]" />;
}
