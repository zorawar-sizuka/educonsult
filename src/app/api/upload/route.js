import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    // Basic safety: only images
    if (!file.type?.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "Only image uploads allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.type.split("/")[1] || "png";
    const safeName = crypto.randomBytes(16).toString("hex") + "." + ext;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${safeName}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}
