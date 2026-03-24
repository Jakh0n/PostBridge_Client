import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      telegramId?: string;
      telegramUsername?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    telegramUsername?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    telegramId?: string;
    telegramUsername?: string | null;
  }
}
