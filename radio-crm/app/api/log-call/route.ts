import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { appendCallLog } from "@/lib/sheets-cache";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  if (!body.call_letters || !body.result) {
    return new NextResponse("call_letters and result required", { status: 400 });
  }

  try {
    await appendCallLog({
      call_letters: body.call_letters,
      caller: session.user.email,
      result: body.result,
      contact_reached: body.contact_reached,
      notes: body.notes,
      follow_up: body.follow_up,
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return new NextResponse(e?.message || "log failed", { status: 500 });
  }
}
