"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <span
        className="h-9 w-20 animate-pulse rounded-md bg-muted"
        aria-hidden
      />
    );
  }

  if (!session?.user) {
    if (pathname === "/auth/signin") {
      return null;
    }

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
  const avatarFallback = label.trim().charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-full ring-offset-background transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Open user menu"
        >
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={session.user.image ?? undefined} alt={label} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <p className="truncate text-sm font-medium leading-none">{label}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {session.user.telegramUsername
              ? `@${session.user.telegramUsername}`
              : "Telegram account"}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="h-4 w-4" aria-hidden />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
