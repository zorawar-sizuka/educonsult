




// app/api/upload/route.js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }

    // Only allow images
    if (!file.type?.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'Only image uploads allowed' }, { status: 400 });
    }

    // Optional: add random suffix + keep original extension
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${crypto.randomUUID()}.${ext}`;

    // Upload to Vercel Blob (public access)
    const blob = await put(filename, file, {
      access: 'public',               // Makes URL public
      addRandomSuffix: false,         // We already randomized filename
      token: process.env.BLOB_READ_WRITE_TOKEN, // Optional if using env
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,                  // Permanent: https://...vercel-storage.com/...
      pathname: blob.pathname,
      size: blob.size,
    });
  } catch (err) {
    console.error('Vercel Blob Upload Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Upload failed: ' + (err.message || 'Unknown error') },
      { status: 500 }
    );
  }
}