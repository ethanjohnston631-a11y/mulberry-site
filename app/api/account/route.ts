import { NextRequest, NextResponse } from "next/server";
import { deleteUser, getCurrentUser, saveUser } from "@/lib/server/auth";
import { setMarketingConsent } from "@/lib/server/subscribers";
import { isSameOrigin, jsonError, readJson } from "@/lib/server/security";

export async function PATCH(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  const user = await getCurrentUser();
  if (!user) return jsonError("Not signed in.", 401);

  const body = await readJson(req);
  if (typeof body?.marketingOptIn !== "boolean") return jsonError("Invalid request.", 400);

  const ok = await setMarketingConsent(user.email, body.marketingOptIn, "account");
  if (!ok) return jsonError("Couldn't update your email preferences. Please try again.", 502);
  await saveUser({ ...user, marketingOptIn: body.marketingOptIn });
  return NextResponse.json({ marketingOptIn: body.marketingOptIn });
}

// Right to delete: removes the account, sessions and saved bag. Order and payment records held by
// Stripe are kept as required for tax and accounting, as explained in the Privacy Policy.
export async function DELETE(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  const user = await getCurrentUser();
  if (!user) return jsonError("Not signed in.", 401);

  const body = await readJson(req);
  if (body?.confirm !== "DELETE") return jsonError("Type DELETE to confirm.", 400);

  if (user.marketingOptIn) await setMarketingConsent(user.email, false, "account-deleted");
  await deleteUser(user);
  return NextResponse.json({ ok: true });
}
