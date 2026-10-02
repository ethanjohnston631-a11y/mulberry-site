import "server-only";
import { cookies } from "next/headers";
import { getKV, KV } from "@/lib/server/kv";
import { randomToken, sha256 } from "@/lib/server/security";

// Passwordless accounts: customers sign in with a one-time code sent to their email.
// No passwords exist, so there are none to leak, reuse or brute-force.
// Session tokens are 256-bit random values; only their SHA-256 hash is stored server-side, and the
// raw token lives in an HttpOnly, Secure, SameSite=Lax cookie that JavaScript cannot read.

export type User = {
  id: string;
  email: string;
  createdAt: string;
  stripeCustomerId?: string;
  marketingOptIn?: boolean;
};

type Session = { userId: string; createdAt: string; userAgent?: string };

export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
export const OTP_TTL_SECONDS = 60 * 10;
export const OTP_MAX_ATTEMPTS = 5;

const isProd = process.env.NODE_ENV === "production";
// The __Host- prefix makes the browser refuse the cookie unless it is Secure, host-only and Path=/.
export const SESSION_COOKIE = isProd ? "__Host-mb_session" : "mb_session";

const keys = {
  user: (id: string) => `user:${id}`,
  userByEmail: (email: string) => `user-email:${sha256(email)}`,
  session: (tokenHash: string) => `session:${tokenHash}`,
  userSessions: (id: string) => `user-sessions:${id}`,
  otp: (email: string) => `otp:${sha256(email)}`,
  cart: (id: string) => `cart:${id}`,
};
export { keys as kvKeys };

export function requireKV(): KV {
  const kv = getKV();
  if (!kv) throw new AccountsUnavailableError();
  return kv;
}

export class AccountsUnavailableError extends Error {
  constructor() {
    super("Accounts storage is not configured.");
  }
}

export async function getUser(id: string) {
  return requireKV().get<User>(keys.user(id));
}

export async function saveUser(user: User) {
  await requireKV().set(keys.user(user.id), user);
}

export async function findOrCreateUser(email: string): Promise<User> {
  const kv = requireKV();
  const existingId = await kv.get<string>(keys.userByEmail(email));
  if (existingId) {
    const user = await kv.get<User>(keys.user(existingId));
    if (user) return user;
  }
  const user: User = { id: randomToken(16), email, createdAt: new Date().toISOString() };
  await kv.set(keys.user(user.id), user);
  await kv.set(keys.userByEmail(email), user.id);
  return user;
}

export async function createSession(userId: string, userAgent?: string) {
  const kv = requireKV();
  const token = randomToken(32);
  const tokenHash = sha256(token);
  const session: Session = { userId, createdAt: new Date().toISOString(), userAgent: userAgent?.slice(0, 200) };
  await kv.set(keys.session(tokenHash), session, SESSION_TTL_SECONDS);
  await kv.sadd(keys.userSessions(userId), tokenHash);

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    priority: "high",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const kv = getKV();
  if (!kv) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length > 100) return null;
  const session = await kv.get<Session>(keys.session(sha256(token)));
  if (!session) return null;
  return kv.get<User>(keys.user(session.userId));
}

export async function destroyCurrentSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  jar.delete(SESSION_COOKIE);
  const kv = getKV();
  if (!kv || !token) return;
  const tokenHash = sha256(token);
  const session = await kv.get<Session>(keys.session(tokenHash));
  await kv.del(keys.session(tokenHash));
  if (session) await kv.srem(keys.userSessions(session.userId), tokenHash);
}

export async function destroyAllSessions(userId: string) {
  const kv = requireKV();
  const hashes = await kv.smembers(keys.userSessions(userId));
  await kv.del(...hashes.map(keys.session), keys.userSessions(userId));
  (await cookies()).delete(SESSION_COOKIE);
}

export async function deleteUser(user: User) {
  const kv = requireKV();
  await destroyAllSessions(user.id);
  await kv.del(keys.user(user.id), keys.userByEmail(user.email), keys.cart(user.id));
}
