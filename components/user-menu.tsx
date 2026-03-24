"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="h-9 w-20 animate-pulse rounded-md bg-muted" aria-hidden />
    );
  }

  if (!session?.user) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link href="/auth/signin">
          <LogIn className="mr-1.5 h-4 w-4" aria-hidden />
          Sign in
        </Link>
      </Button>
    );
  }

  const label =
    session.user.name ??
    (session.user.telegramUsername
      ? `@${session.user.telegramUsername}`
      : "Account");

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[140px] truncate text-sm text-muted-foreground sm:inline">
        <User className="mr-1 inline h-3.5 w-3.5 align-text-bottom" aria-hidden />
        {label}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="mr-1.5 h-4 w-4" aria-hidden />
        Sign out
      </Button>
    </div>
  );
}
