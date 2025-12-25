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

    if (!imageBase64 || typeof imageBase64 !== "string") {
      console.error("No image provided in request");
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
    if (!GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Starting toy transformation with Google Gemini...");

    const prompt = `Transform this anime character into a premium 3D collectible chibi figure. The figure should have:
- Cute oversized head with large expressive anime eyes
- Small chibi body proportions
- Glossy plastic vinyl finish like Nendoroid/Good Smile Company figures
- Professional product photo quality
- Pure white studio background
- Soft ambient lighting
- High quality collectible figure appearance
Keep the character's distinctive features, colors, and outfit while making it look like a real physical toy figure.`;

    // Extract base64 data from data URL
    const base64Data = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;

    // Detect mime type from data URL or default to jpeg
    let mimeType = "image/jpeg";
    if (imageBase64.startsWith("data:")) {
      const match = imageBase64.match(/data:([^;]+);/);
      if (match) mimeType = match[1];
    }

    console.log("Calling Google Gemini image model...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GOOGLE_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  // Note: REST uses camelCase (inlineData/mimeType) per Google docs
                  inlineData: {
                    mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    if (!response.ok) {
      let msg = "Failed to generate image. Please try again.";
      try {
        const errJson = await response.json();
        msg = errJson?.error?.message || errJson?.message || msg;
      } catch {
        try {
          const errText = await response.text();
          if (errText) msg = errText;
        } catch {
          // ignore
        }
      }

      console.error("Google Gemini API error:", response.status, msg);

      return new Response(JSON.stringify({ error: msg }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("Google Gemini response received");

    // Extract the generated image (handle both camelCase and snake_case variants)
    let generatedImage: string | null = null;

    for (const candidate of data.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        const inline = part.inlineData ?? part.inline_data;
        const inlineData = inline?.data;
        if (inlineData) {
          const imgMime = inline?.mimeType ?? inline?.mime_type ?? "image/png";
          generatedImage = `data:${imgMime};base64,${inlineData}`;
          break;
        }
      }
      if (generatedImage) break;
    }

    if (!generatedImage) {
      console.error("No image in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "No image was generated. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Image transformation successful");

    return new Response(
      JSON.stringify({
        transformedImage: generatedImage,
        message: "Transformation complete!",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in transform-to-toy function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
