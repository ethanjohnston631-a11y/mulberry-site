import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { getStripe, listOrdersForEmail } from "@/lib/server/stripe";
import { jsonError } from "@/lib/server/security";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Not signed in.", 401);
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ orders: [] }, { headers: { "Cache-Control": "no-store" } });

  try {
    const orders = await listOrdersForEmail(stripe, user.email);
    return NextResponse.json({ orders }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[orders]", err instanceof Error ? err.message : err);
    return jsonError("Couldn't load your orders right now.", 502);
  }
}
