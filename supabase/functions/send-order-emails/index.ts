import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

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
}

// Generate a unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKY-${timestamp}-${random}`;
}

// Send email via EmailJS REST API
async function sendEmailJS(templateId: string, templateParams: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  const serviceId = Deno.env.get("EMAILJS_SERVICE_ID");
  const publicKey = Deno.env.get("EMAILJS_PUBLIC_KEY");
  const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");

  if (!serviceId || !publicKey) {
    return { success: false, error: "EmailJS credentials not configured" };
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("EmailJS error:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error("EmailJS fetch error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
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
      try {
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
      } catch (e) {
        console.error("Error uploading reference image:", e);
      }
    }

    if (transformedImageBase64) {
      try {
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
      } catch (e) {
        console.error("Error uploading transformed image:", e);
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

    // Send admin notification email (template_2cb6uc7)
    console.log("Sending admin email via EmailJS...");
    const adminResult = await sendEmailJS("template_2cb6uc7", {
      order_number: orderNumber,
      customer_name: customerName,
      customer_email: customerEmail,
      payment_method: paymentMethod,
      message: message || "No special requests",
      reference_image_url: referenceImageUrl || "",
      transformed_image_url: transformedImageUrl || "",
      amount: "$489 USD",
    });
    console.log("Admin email result:", adminResult);

    // Send customer confirmation email (template_kpvs4u7)
    console.log("Sending customer email via EmailJS...");
    const customerResult = await sendEmailJS("template_kpvs4u7", {
      to_email: customerEmail,
      to_name: firstName,
      customer_name: firstName,
      order_number: orderNumber,
      payment_method: paymentMethod,
      amount: "$489 USD",
    });
    console.log("Customer email result:", customerResult);

    return new Response(
      JSON.stringify({
        success: true,
        orderNumber,
        adminEmailSent: adminResult.success,
        customerEmailSent: customerResult.success,
      }),
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
