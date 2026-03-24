import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const botToken = process.env.TELEGRAM_BOT_TOKEN;

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      id: "telegram",
      name: "Telegram",
      credentials: {
        initData: { label: "initData", type: "text" },
      },
      async authorize(credentials) {
        if (!botToken) {
          return null;
        }

        const initData = credentials?.initData;
        if (typeof initData !== "string" || initData.length === 0) {
          return null;
        }

        const { verifyTelegramWebAppInitData } =
          await import("@/lib/telegram-auth");
        const result = verifyTelegramWebAppInitData(initData, botToken);
        if (!result.ok) {
          return null;
        }

        const { user } = result;
        const id = String(user.id);
        const displayName = [user.first_name, user.last_name]
          .filter(Boolean)
          .join(" ");

        return {
          id,
          name: displayName || user.first_name,
          image:
            typeof user.photo_url === "string" && user.photo_url.length > 0
              ? user.photo_url
              : undefined,
          telegramUsername:
            typeof user.username === "string" && user.username.length > 0
              ? user.username
              : null,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && "telegramUsername" in user) {
        token.telegramId = user.id;
        token.telegramUsername =
          (user as { telegramUsername?: string | null }).telegramUsername ??
          null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        session.user.telegramId =
          typeof token.telegramId === "string" ? token.telegramId : undefined;
        session.user.telegramUsername =
          typeof token.telegramUsername === "string" ||
          token.telegramUsername === null
            ? token.telegramUsername
            : undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});
