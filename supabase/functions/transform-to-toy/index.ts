import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      console.error("No image provided in request");
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Starting premium 3D toy transformation...");
    console.log("Image base64 length:", imageBase64.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Transform this character into a PREMIUM COLLECTIBLE 3D CHIBI FIGURE exactly like Nendoroid, Good Smile Company, or Pop Mart figures.

CRITICAL - BACKGROUND MUST BE PURE WHITE:
- Replace the background with a CLEAN, PURE WHITE (#FFFFFF) background
- The background should be completely white like a professional product photography studio
- NO gradients, NO shadows on background, NO colored backgrounds - ONLY pure white
- This is for a product catalog, so the white background is essential

3D FIGURE REQUIREMENTS:
• Chibi proportions: oversized cute head (about 1/2 to 1/3 of total body height), small adorable body
• Premium glossy plastic/vinyl material with realistic subsurface scattering and shine highlights
• Ultra-detailed face with large expressive anime eyes, subtle blush marks
• Keep ALL original features: exact hair color, hairstyle, eye color, outfit, accessories
• High-end collectible figure quality with fine sculpted details on clothing folds and textures
• Soft ambient lighting that makes the figure pop naturally against the white background
• Smooth cel-shaded aesthetic with professional soft shadows ON THE FIGURE ONLY
• The figure should look like a $100+ premium Japanese collectible

The result should look like an actual product photo of a high-end collectible figure on a PURE WHITE background like in an official product catalog.`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to transform image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response received");

    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImage) {
      console.error("No image in AI response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "No image generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Image transformation successful");

    return new Response(
      JSON.stringify({ 
        transformedImage: generatedImage,
        message: data.choices?.[0]?.message?.content || "Transformation complete!"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in transform-to-toy function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
