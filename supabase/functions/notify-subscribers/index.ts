// @ts-nocheck
// @ts-ignore - Deno environment
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface Subscriber {
  email: string;
  id?: string;
  created_at?: string;
}

interface NotificationPayload {
  subject: string;
  content: string;
  scriptId?: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      },
    );

    // Parse request body
    const payload: NotificationPayload = await req.json();
    const { subject, content, scriptId } = payload;

    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get all subscribers
    const { data: subscribers, error: fetchError } = await supabaseClient
      .from("subscribers")
      .select("email");

    if (fetchError) {
      throw new Error(`Failed to fetch subscribers: ${fetchError.message}`);
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: "No subscribers found" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send emails using Resend
    const emailResults = await sendEmails(subscribers, subject, content);

    // Log notification to database
    const { error: logError } = await supabaseClient
      .from("notifications")
      .insert({
        subject,
        content,
        script_id: scriptId,
        recipient_count: subscribers.length,
        sent_at: new Date().toISOString(),
      });

    if (logError) {
      console.error("Failed to log notification:", logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notification sent to ${subscribers.length} subscribers`,
        results: emailResults,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});

// Email sending function using Resend
async function sendEmails(
  subscribers: Subscriber[],
  subject: string,
  content: string,
): Promise<{ success: string[]; failed: string[] }> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured");
    return { success: [], failed: subscribers.map((s) => s.email) };
  }

  const results = {
    success: [] as string[],
    failed: [] as string[],
  };

  // Send emails in parallel with rate limiting
  const batchSize = 10;
  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);
    const promises = batch.map(async (subscriber) => {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Your App <notifications@yourapp.com>",
            to: [subscriber.email],
            subject: subject,
            html: content,
          }),
        });

        if (response.ok) {
          results.success.push(subscriber.email);
        } else {
          results.failed.push(subscriber.email);
          console.error(
            `Failed to send to ${subscriber.email}:`,
            await response.text(),
          );
        }
      } catch (error) {
        results.failed.push(subscriber.email);
        console.error(`Error sending to ${subscriber.email}:`, error);
      }
    });

    await Promise.all(promises);

    // Rate limiting: wait 1 second between batches
    if (i + batchSize < subscribers.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}
