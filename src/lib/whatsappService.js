const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID;

if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
  // Don’t throw at import-time in dev; route can still load.
  console.warn("Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID");
}

export const whatsappService = {
  async sendTextMessage(to, body) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: { body },
          }),
        }
      );

      const data = await response.json().catch(() => null);

      // If Meta returns a non-2xx, normalize an error
      if (!response.ok) {
        const code = data?.error?.code;
        if (code === 131047) throw new Error("24_HOUR_WINDOW_CLOSED");
        throw new Error(data?.error?.message || "WHATSAPP_SEND_FAILED");
      }

      // Handle “24-hour window closed”
      if (data?.error?.code === 131047) {
        throw new Error("24_HOUR_WINDOW_CLOSED");
      }

      return { success: true, data };
    } catch (error) {
      console.error("WhatsApp Send Error:", error);
      return { success: false, error: error.message };
    }
  },
};
