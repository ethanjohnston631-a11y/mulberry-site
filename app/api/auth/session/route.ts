import { NextResponse } from "next/server";
import { getKV } from "@/lib/server/kv";
import { getCurrentUser } from "@/lib/server/auth";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json(
    {
      accountsEnabled: !!getKV(),
      user: user ? { email: user.email, marketingOptIn: !!user.marketingOptIn } : null,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
