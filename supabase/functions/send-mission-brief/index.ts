// Mission Brief handler: saves contact form submissions to the database
// and forwards them to an optional n8n webhook for email/CRM automation.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod";

const BriefSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  mission_types: z.array(z.string().max(100)).default([]),
  message: z.string().min(1).max(5000),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json().catch(() => null);
    const parsed = BriefSchema.safeParse(raw);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { name, email, mission_types, message } = parsed.data;

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(
        JSON.stringify({ error: "Supabase environment is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      mission_types,
      message: message.trim(),
      status: "new",
      source: "website",
    };

    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/mission_briefs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!dbRes.ok) {
      const text = await dbRes.text();
      console.error("DB insert failed:", dbRes.status, text);
      return new Response(
        JSON.stringify({ error: "Failed to save mission brief", details: text }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const n8nWebhookUrl = Deno.env.get("N8N_WEBHOOK_URL");
    let forwarded = false;

    if (n8nWebhookUrl) {
      try {
        const webhookRes = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        forwarded = webhookRes.ok;
        if (!webhookRes.ok) {
          const text = await webhookRes.text();
          console.error("n8n webhook failed:", webhookRes.status, text);
        }
      } catch (err) {
        console.error("n8n webhook error:", err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, forwarded }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-mission-brief error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
