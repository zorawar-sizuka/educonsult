import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// 1. Setup Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Verification Step (GET Request)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Check if the token matches what you set in .env.local
  if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    return new NextResponse(challenge, { status: 200 });
  }
  
  return new NextResponse('Forbidden', { status: 403 });
}

// 3. Receiving Messages (POST Request)
export async function POST(request) {
  try {
    const body = await request.json();

    // Check if it's a WhatsApp message
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (message) {
        // Extract data safely
        const wa_id = message.id;
        const from_number = message.from;
        const bodyText = message.text?.body || '[Media/Other]';
        const type = message.type;

        // Insert into Supabase
        const { error } = await supabase.from('messages').insert({
          wa_id,
          from_number,
          body: bodyText,
          type,
          direction: 'inbound',
          status: 'received',
        });

        if (error) {
            console.error('Supabase Error:', error);
        } else {
            console.log('Message saved to Supabase!');
        }
      }
      return new NextResponse('EVENT_RECEIVED', { status: 200 });
    }

    return new NextResponse('Not found', { status: 404 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}