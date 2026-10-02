import { NextResponse } from "next/server";
import { sanitizeCart, type CartItem } from "@/lib/cart-items";
import { getCurrentUser, kvKeys, requireKV } from "@/lib/server/auth";
import { getStripe, listOrdersForEmail } from "@/lib/server/stripe";
import { jsonError } from "@/lib/server/security";

// Right to access / portability: everything we hold about the signed-in customer, as JSON.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Not signed in.", 401);

  const stripe = getStripe();
  const orders = stripe ? await listOrdersForEmail(stripe, user.email).catch(() => []) : [];
  const cart = sanitizeCart(await requireKV().get<CartItem[]>(kvKeys.cart(user.id)));

  const data = {
    exportedAt: new Date().toISOString(),
    account: { email: user.email, createdAt: user.createdAt, marketingOptIn: !!user.marketingOptIn },
    savedBag: cart.map(({ name, color, size, quantity, price }) => ({ name, color, size, quantity, price })),
    orders,
  };

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="mulberry-account-data.json"',
      "Cache-Control": "no-store",
    },
  });
}
