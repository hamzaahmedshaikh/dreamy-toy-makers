import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  firstName: string;
  lastName: string;
  customerEmail: string;
  paymentMethod: string;
  message: string;
  referenceImageBase64: string;
  transformedImageBase64: string;
  sendCustomer?: boolean;
}

// Generate a unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKY-${timestamp}-${random}`;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      firstName,
      lastName,
      customerEmail,
      paymentMethod,
      message,
      referenceImageBase64,
      transformedImageBase64,
      sendCustomer,
    }: OrderEmailRequest = await req.json();

    console.log("Received order email request for:", customerEmail);

    const orderNumber = generateOrderNumber();
    const customerName = `${firstName} ${lastName}`;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let referenceImageUrl = null;
    let transformedImageUrl = null;

    // Upload images to storage
    if (referenceImageBase64) {
      const base64Data = referenceImageBase64.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      const fileName = `${orderNumber}-reference.png`;
      
      const { error: uploadError } = await supabase.storage
        .from("order-images")
        .upload(fileName, imageBuffer, { contentType: "image/png" });
      
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("order-images").getPublicUrl(fileName);
        referenceImageUrl = urlData.publicUrl;
      }
    }

    if (transformedImageBase64) {
      const base64Data = transformedImageBase64.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      const fileName = `${orderNumber}-transformed.png`;
      
      const { error: uploadError } = await supabase.storage
        .from("order-images")
        .upload(fileName, imageBuffer, { contentType: "image/png" });
      
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("order-images").getPublicUrl(fileName);
        transformedImageUrl = urlData.publicUrl;
      }
    }

    // Save order to database
    const { error: dbError } = await supabase.from("orders").insert({
      order_number: orderNumber,
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_email: customerEmail,
      payment_method: paymentMethod,
      message: message || null,
      reference_image_url: referenceImageUrl,
      transformed_image_url: transformedImageUrl,
      status: "pending",
      amount: 489.00,
    });

    if (dbError) {
      console.error("Error saving order to database:", dbError);
    } else {
      console.log("Order saved to database:", orderNumber);
    }

    // Prepare attachments for admin email
    const attachments: Array<{ filename: string; content: string }> = [];

    if (referenceImageBase64) {
      const base64Data = referenceImageBase64.replace(/^data:image\/\w+;base64,/, "");
      attachments.push({
        filename: "reference-image.png",
        content: base64Data,
      });
    }

    if (transformedImageBase64) {
      const base64Data = transformedImageBase64.replace(/^data:image\/\w+;base64,/, "");
      attachments.push({
        filename: "toy-preview.png",
        content: base64Data,
      });
    }

    // Email to Skylar (admin) - personal voice
    const adminEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #fdf8f5; padding: 40px; border-radius: 16px;">
        <h1 style="color: #d4778c; font-size: 28px; margin-bottom: 20px;">New Order! 🎉</h1>
        
        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #f0e0e5;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 16px;">Order Details</h2>
          <p style="color: #666; margin: 8px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Customer:</strong> ${customerName}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Email:</strong> ${customerEmail}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Payment:</strong> ${paymentMethod}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Amount:</strong> $489 USD</p>
          <p style="color: #666; margin: 8px 0;"><strong>Notes:</strong> ${message || "None"}</p>
        </div>

        <p style="color: #666; font-size: 14px;">Reference images attached.</p>
      </div>
    `;

    console.log("Sending admin email...");

    const adminEmailResponse = await resend.emails.send({
      from: "Orders <onboarding@resend.dev>",
      to: ["whatsupskylar@gmail.com"],
      subject: `New Order #${orderNumber} from ${customerName}`,
      html: adminEmailHtml,
      attachments,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Customer confirmation email - Skylar's personal voice
    if (sendCustomer !== false) {
      const customerEmailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #fdf8f5; padding: 40px; border-radius: 16px;">
          <h1 style="color: #d4778c; font-size: 28px; margin-bottom: 20px;">Hey ${firstName}! I got your order 💕</h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Thanks so much for ordering a custom toy! I'm super excited to start working on bringing your character to life.
          </p>

          <div style="background: white; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #f0e0e5;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 16px;">Your Order</h2>
            <p style="color: #666; margin: 8px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
            <p style="color: #666; margin: 8px 0;"><strong>Amount:</strong> $489 USD</p>
            <p style="color: #666; margin: 8px 0;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          </div>

          <div style="background: #fff5f7; padding: 20px; border-radius: 12px; margin: 24px 0;">
            <h3 style="color: #d4778c; font-size: 16px; margin-bottom: 12px;">What happens next?</h3>
            <ol style="color: #666; padding-left: 20px; line-height: 1.8;">
              ${paymentMethod === "paypal" ? `
                <li>Check your PayPal for my payment request</li>
                <li>Complete the payment</li>
                <li>DM me on X (@whatsupskylar) with your confirmation</li>
              ` : `
                <li>DM me on X @whatsupskylar to arrange crypto payment</li>
              `}
              <li>I'll start crafting your custom toy!</li>
              <li>I'll send you updates as I work on it</li>
            </ol>
          </div>

          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Got questions? Just hit me up on X:
            <a href="https://x.com/whatsupskylar" style="color: #d4778c;">@whatsupskylar</a>
          </p>

          <p style="color: #666; font-size: 16px; margin-top: 24px;">
            Can't wait to make this for you!
          </p>
          
          <p style="color: #d4778c; font-size: 18px; margin-top: 24px;">
            — Skylar 💕
          </p>

          <hr style="border: none; border-top: 1px solid #f0e0e5; margin: 32px 0;" />
          
          <p style="color: #999; font-size: 11px; line-height: 1.6;">
            Shipping is calculated separately based on your location and isn't included in the order total.
          </p>
        </div>
      `;

      console.log("Sending customer confirmation email...");

      const customerEmailResponse = await resend.emails.send({
        from: "Skylar <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Got your order! #${orderNumber} 💕`,
        html: customerEmailHtml,
      });

      console.log("Customer email sent:", customerEmailResponse);

      return new Response(
        JSON.stringify({
          success: true,
          orderNumber,
          adminEmail: adminEmailResponse,
          customerEmail: customerEmailResponse,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, orderNumber, adminEmail: adminEmailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});