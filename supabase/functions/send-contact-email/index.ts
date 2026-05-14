// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const YOUR_EMAIL = "m2bmsbabu@gmail.com"; // ← এখানে আপনার email দিন

serve(async (req) => {
  // CORS handle করুন
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { name, email, subject, message } = await req.json();

    // Supabase এ save করুন
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    await supabase.from("contacts").insert({ name, email, subject, message });

    // Resend দিয়ে email পাঠান
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: YOUR_EMAIL,
        subject: `নতুন মেসেজ: ${subject}`,
        html: `
          <h2>নতুন Contact Form Submission</h2>
          <p><strong>নাম:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    if (!res.ok) throw new Error("Email পাঠাতে ব্যর্থ হয়েছে");

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
