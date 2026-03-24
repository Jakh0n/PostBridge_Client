import { createHmac, timingSafeEqual } from "crypto";

const MAX_AUTH_AGE_SEC = 86_400;

export type TelegramWebAppUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
};

/**
 * Validates Telegram Mini App `initData` per
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export function verifyTelegramWebAppInitData(
  initData: string,
  botToken: string
): { ok: false } | { ok: true; user: TelegramWebAppUser } {
  if (!initData || !botToken) return { ok: false };
  if (initData.length > 100_000) return { ok: false };

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash || !/^[0-9a-f]{64}$/i.test(hash)) return { ok: false };

  const entries: [string, string][] = [];
  params.forEach((value, key) => {
    if (key === "hash") return;
    entries.push([key, value]);
  });
  entries.sort(([a], [b]) => a.localeCompare(b));
  const dataCheckString = entries.map(([k, v]) => `${k}=${v}`).join("\n");

  const secretKey = createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const computedHex = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  const computedBuf = Buffer.from(computedHex, "hex");
  const hashBuf = Buffer.from(hash.toLowerCase(), "hex");
  if (computedBuf.length !== hashBuf.length || !timingSafeEqual(computedBuf, hashBuf)) {
    return { ok: false };
  }

  const authDate = Number(params.get("auth_date"));
  if (!Number.isFinite(authDate)) return { ok: false };
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > MAX_AUTH_AGE_SEC) return { ok: false };

  const userRaw = params.get("user");
  if (!userRaw) return { ok: false };

  let user: TelegramWebAppUser;
  try {
    user = JSON.parse(userRaw) as TelegramWebAppUser;
  } catch {
    return { ok: false };
  }

  if (typeof user.id !== "number" || typeof user.first_name !== "string") {
    return { ok: false };
  }

  return { ok: true, user };
}
