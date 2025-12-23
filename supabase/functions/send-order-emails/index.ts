import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

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
  // When false, only the admin email is sent (no customer email)
  sendCustomer?: boolean;
}

// Generate a unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKY-${timestamp}-${random}`;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
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

    console.log("Received order email request for:", customerEmail, "sendCustomer:", sendCustomer);

    const orderNumber = generateOrderNumber();
    const customerName = `${firstName} ${lastName}`;

    // Prepare attachments for admin email
    const attachments: Array<{ filename: string; content: string }> = [];

    if (referenceImageBase64) {
      // Extract base64 data (remove data URL prefix if present)
      const base64Data = referenceImageBase64.replace(/^data:image\/\w+;base64,/, "");
      attachments.push({
        filename: "reference-image.png",
        content: base64Data,
      });
    }

    if (transformedImageBase64) {
      const base64Data = transformedImageBase64.replace(/^data:image\/\w+;base64,/, "");
      attachments.push({
        filename: "transformed-toy-preview.png",
        content: base64Data,
      });
    }

    // Email to Skylar (admin) with reference images
    const adminEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #fdf8f5; padding: 40px; border-radius: 16px;">
        <h1 style="color: #d4778c; font-size: 28px; margin-bottom: 20px;">🎉 New Order Received!</h1>
        
        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #f0e0e5;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 16px;">Order Details</h2>
          <p style="color: #666; margin: 8px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Customer Name:</strong> ${customerName}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Customer Email:</strong> ${customerEmail}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p style="color: #666; margin: 8px 0;"><strong>Amount:</strong> $1,299 USD</p>
          <p style="color: #666; margin: 8px 0;"><strong>Message:</strong> ${message || "No message provided"}</p>
        </div>

        <p style="color: #666; font-size: 14px;">Reference images are attached to this email.</p>
      </div>
    `;

    console.log("Sending admin email with attachments count:", attachments.length);

    const adminEmailResponse = await resend.emails.send({
      from: "OC Toys Orders <onboarding@resend.dev>",
      to: ["whatsupskylar@gmail.com"],
      subject: `🎉 New Order #${orderNumber} from ${customerName}`,
      html: adminEmailHtml,
      attachments,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Email to customer (order confirmation)
    if (sendCustomer !== false) {
      const customerEmailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #fdf8f5; padding: 40px; border-radius: 16px;">
          <h1 style="color: #d4778c; font-size: 28px; margin-bottom: 20px;">Thank you for your order! 💕</h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Hi ${firstName}! I've received your order and I'm so excited to create your custom 3D anime toy!
          </p>

          <div style="background: white; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #f0e0e5;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 16px;">Order Confirmation</h2>
            <p style="color: #666; margin: 8px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
            <p style="color: #666; margin: 8px 0;"><strong>Amount:</strong> $1,299 USD</p>
            <p style="color: #666; margin: 8px 0;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          </div>

          <div style="background: #fff5f7; padding: 20px; border-radius: 12px; margin: 24px 0;">
            <h3 style="color: #d4778c; font-size: 16px; margin-bottom: 12px;">What's Next?</h3>
            <ol style="color: #666; padding-left: 20px; line-height: 1.8;">
              ${paymentMethod === "paypal" ? `
                <li>Check your PayPal email for the payment request</li>
                <li>Complete the payment</li>
                <li>Share your payment confirmation on X and tag me @whatsupskylar</li>
              ` : `
                <li>Reach out to me on X @whatsupskylar to arrange payment</li>
              `}
              <li>I'll start crafting your custom toy!</li>
              <li>You'll receive updates on your order progress</li>
            </ol>
          </div>

          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            If you have any questions, feel free to reach out to me on X (Twitter):
            <a href="https://x.com/whatsupskylar" style="color: #d4778c;">@whatsupskylar</a>
          </p>

          <p style="color: #666; font-size: 16px; margin-top: 24px;">
            Thank you for choosing me to bring your character to life!
          </p>
          
          <p style="color: #d4778c; font-size: 18px; margin-top: 24px;">
            — Skylar 💕
          </p>

          <hr style="border: none; border-top: 1px solid #f0e0e5; margin: 32px 0;" />
          
          <p style="color: #999; font-size: 12px; line-height: 1.6;">
            Shipping costs are not included in the order total and will be calculated separately based on your location.
          </p>
        </div>
      `;

      console.log("Sending customer confirmation email...");

      const customerEmailResponse = await resend.emails.send({
        from: "Skylar - OC Toys <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Order Confirmed! #${orderNumber} 💕`,
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

    console.log("sendCustomer=false; skipping customer email");

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
