import { NextResponse } from "next/server";
import { whatsappService } from "@/lib/whatsappService";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const to = String(body?.to || "").trim();
    const message = String(body?.message || "").trim();

    if (!to || !message) {
      return NextResponse.json(
        { ok: false, error: "INVALID_PAYLOAD", received: { to, message } },
        { status: 400 }
      );
    }

    // 1) Check last inbound message time (24h rule)
    const { data: lastInbound, error: inboundErr } = await supabaseAdmin
      .from("messages")
      .select("timestamp")
      .eq("from_number", to)
      .eq("direction", "inbound")
      .order("timestamp", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (inboundErr) {
      console.error("DB inbound fetch error:", inboundErr);
      return NextResponse.json(
        { ok: false, error: "DB_READ_FAILED" },
        { status: 500 }
      );
    }

    if (lastInbound?.timestamp) {
      const hours =
        (Date.now() - new Date(lastInbound.timestamp).getTime()) / 36e5;
      if (hours > 24) {
        return NextResponse.json(
          { ok: false, error: "24_HOUR_WINDOW_CLOSED" },
          { status: 403 }
        );
      }
    }

    // 2) Send WhatsApp message
    const send = await whatsappService.sendTextMessage(to, message);

    if (!send.success) {
      if (send.error === "24_HOUR_WINDOW_CLOSED") {
        return NextResponse.json(
          { ok: false, error: "24_HOUR_WINDOW_CLOSED" },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { ok: false, error: send.error || "WHATSAPP_SEND_FAILED" },
        { status: 500 }
      );
    }

    // 3) Persist outbound message
    const waId = send.data?.messages?.[0]?.id ?? null;

    const { error: insertErr } = await supabaseAdmin.from("messages").insert({
      from_number: process.env.WHATSAPP_BUSINESS_NUMBER || null, // optional
      to_number: to,
      body: message,
      direction: "outbound",
      timestamp: new Date().toISOString(),
      wa_message_id: waId,
    });

    if (insertErr) {
      console.error("DB outbound insert error:", insertErr);
      // Still return ok, because message was sent successfully
    }

    return NextResponse.json({ ok: true, wa_message_id: waId }, { status: 200 });
  } catch (err) {
    console.error("CHAT_SEND_ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
