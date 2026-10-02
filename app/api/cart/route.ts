import { NextRequest, NextResponse } from "next/server";
import { sanitizeCart, type CartItem } from "@/lib/cart-items";
import { getCurrentUser, kvKeys, requireKV } from "@/lib/server/auth";
import { isSameOrigin, jsonError, readJson } from "@/lib/server/security";

const CART_TTL_SECONDS = 60 * 60 * 24 * 180;
const noStore = { "Cache-Control": "no-store" };

// Signed-in customers' bags are stored server-side so they follow them across devices.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Not signed in.", 401);
  const items = sanitizeCart(await requireKV().get<CartItem[]>(kvKeys.cart(user.id)));
  return NextResponse.json({ items }, { headers: noStore });
}

export async function PUT(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  const user = await getCurrentUser();
  if (!user) return jsonError("Not signed in.", 401);

  const body = await readJson(req);
  const items = sanitizeCart(body?.items);
  const kv = requireKV();
  if (items.length) await kv.set(kvKeys.cart(user.id), items, CART_TTL_SECONDS);
  else await kv.del(kvKeys.cart(user.id));
  return NextResponse.json({ items }, { headers: noStore });
}
