import { createHash, createHmac } from "crypto";

const MAX_AUTH_AGE_SEC = 86_400;

/**
 * Verifies Telegram Login Widget payload per
 * https://core.telegram.org/widgets/login#checking-authorization
 */
export function verifyTelegramLogin(
  data: Record<string, string | undefined>,
  botToken: string
): boolean {
  const hash = data.hash;
  if (!hash || !botToken) return false;

  const rest = { ...data };
  delete rest.hash;
  const entries = Object.entries(rest).filter(
    ([, v]) => v !== undefined && v !== ""
  ) as [string, string][];

  const checkString = [...entries]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secretKey = createHash("sha256").update(botToken).digest();
  const hmac = createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  if (hmac !== hash) return false;

  const authDate = Number(data.auth_date);
  if (!Number.isFinite(authDate)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > MAX_AUTH_AGE_SEC) return false;

  return true;
}
