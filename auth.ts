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
        id: { label: "id", type: "text" },
        first_name: { label: "First name", type: "text" },
        last_name: { label: "Last name", type: "text" },
        username: { label: "Username", type: "text" },
        photo_url: { label: "Photo URL", type: "text" },
        auth_date: { label: "auth_date", type: "text" },
        hash: { label: "hash", type: "text" },
      },
      async authorize(credentials) {
        if (!botToken) {
          return null;
        }

        const id = credentials?.id;
        const first_name = credentials?.first_name;
        const auth_date = credentials?.auth_date;
        const hash = credentials?.hash;

        if (
          typeof id !== "string" ||
          typeof first_name !== "string" ||
          typeof auth_date !== "string" ||
          typeof hash !== "string"
        ) {
          return null;
        }

        const payload: Record<string, string | undefined> = {
          id,
          first_name,
          auth_date,
          hash,
        };

        const last_name = credentials.last_name;
        const username = credentials.username;
        const photo_url = credentials.photo_url;

        if (typeof last_name === "string" && last_name.length > 0) {
          payload.last_name = last_name;
        }
        if (typeof username === "string" && username.length > 0) {
          payload.username = username;
        }
        if (typeof photo_url === "string" && photo_url.length > 0) {
          payload.photo_url = photo_url;
        }

        const { verifyTelegramLogin } = await import("@/lib/telegram-auth");
        if (!verifyTelegramLogin(payload, botToken)) {
          return null;
        }

        const displayName = [first_name, last_name].filter(Boolean).join(" ");

        return {
          id,
          name: displayName || first_name,
          image:
            typeof photo_url === "string" && photo_url.length > 0
              ? photo_url
              : undefined,
          telegramUsername:
            typeof username === "string" && username.length > 0
              ? username
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
