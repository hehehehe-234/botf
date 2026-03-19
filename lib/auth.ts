import crypto from "crypto";

const SESSION_COOKIE = "admin_session";

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function signSession(username: string) {
  const secret = process.env.SESSION_SECRET || "dev_secret";
  const payload = `${username}|${Date.now()}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}|${sig}`).toString("base64url");
}

export function verifySession(token?: string | null) {
  if (!token) return false;
  try {
    const secret = process.env.SESSION_SECRET || "dev_secret";
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const [username, issuedAt, sig] = raw.split("|");
    if (!username || !issuedAt || !sig) return false;
    const payload = `${username}|${issuedAt}`;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}
