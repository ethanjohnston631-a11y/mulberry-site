import { NextRequest, NextResponse } from "next/server";
import { destroyAllSessions, destroyCurrentSession, getCurrentUser } from "@/lib/server/auth";
import { isSameOrigin, jsonError, readJson } from "@/lib/server/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  const body = await readJson(req);

  if (body?.everywhere === true) {
    const user = await getCurrentUser();
    if (user) {
      await destroyAllSessions(user.id);
      return NextResponse.json({ ok: true });
    }
  }
  await destroyCurrentSession();
  return NextResponse.json({ ok: true });
}
