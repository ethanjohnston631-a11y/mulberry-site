import "server-only";
import { Redis } from "@upstash/redis";

// Minimal key-value interface used by accounts, sessions, carts and rate limiting.
// Production uses Upstash Redis (Vercel Marketplace → Storage → Upstash for Redis injects the
// env vars automatically). Local development falls back to an in-memory store.

export interface KV {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
  del(...keys: string[]): Promise<void>;
  incr(key: string, ttlSeconds: number): Promise<number>;
  sadd(key: string, member: string): Promise<void>;
  srem(key: string, member: string): Promise<void>;
  smembers(key: string): Promise<string[]>;
}

class UpstashKV implements KV {
  constructor(private redis: Redis) {}
  async get<T>(key: string) {
    return (await this.redis.get<T>(key)) ?? null;
  }
  async set(key: string, value: unknown, ttlSeconds?: number) {
    if (ttlSeconds) await this.redis.set(key, value, { ex: ttlSeconds });
    else await this.redis.set(key, value);
  }
  async del(...keys: string[]) {
    if (keys.length) await this.redis.del(...keys);
  }
  async incr(key: string, ttlSeconds: number) {
    const [count] = await this.redis.multi().incr(key).expire(key, ttlSeconds, "NX").exec<[number, number]>();
    return count;
  }
  async sadd(key: string, member: string) {
    await this.redis.sadd(key, member);
  }
  async srem(key: string, member: string) {
    await this.redis.srem(key, member);
  }
  async smembers(key: string) {
    return this.redis.smembers(key);
  }
}

class MemoryKV implements KV {
  private data = new Map<string, { value: unknown; expires?: number }>();

  private live(key: string) {
    const entry = this.data.get(key);
    if (entry?.expires && entry.expires < Date.now()) {
      this.data.delete(key);
      return undefined;
    }
    return entry;
  }
  async get<T>(key: string) {
    const entry = this.live(key);
    return entry ? (structuredClone(entry.value) as T) : null;
  }
  async set(key: string, value: unknown, ttlSeconds?: number) {
    this.data.set(key, {
      value: structuredClone(value),
      expires: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
    });
  }
  async del(...keys: string[]) {
    keys.forEach((k) => this.data.delete(k));
  }
  async incr(key: string, ttlSeconds: number) {
    const entry = this.live(key);
    const next = (Number(entry?.value) || 0) + 1;
    this.data.set(key, { value: next, expires: entry?.expires ?? Date.now() + ttlSeconds * 1000 });
    return next;
  }
  async sadd(key: string, member: string) {
    const set = new Set((this.live(key)?.value as string[]) ?? []);
    set.add(member);
    this.data.set(key, { value: Array.from(set) });
  }
  async srem(key: string, member: string) {
    const set = new Set((this.live(key)?.value as string[]) ?? []);
    set.delete(member);
    this.data.set(key, { value: Array.from(set) });
  }
  async smembers(key: string) {
    return [...((this.live(key)?.value as string[]) ?? [])];
  }
}

const globalForKV = globalThis as unknown as { __mulberryKV?: KV | null };

export function getKV(): KV | null {
  if (globalForKV.__mulberryKV !== undefined) return globalForKV.__mulberryKV;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  let kv: KV | null = null;
  if (url && token) kv = new UpstashKV(new Redis({ url, token }));
  else if (process.env.NODE_ENV !== "production") kv = new MemoryKV();

  globalForKV.__mulberryKV = kv;
  return kv;
}
