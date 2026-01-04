import { useState, useCallback } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles, CheckCircle, Heart, Package, ArrowRight, Image, Loader2, Wand2, Star, FileBox, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Input validation schema
const orderSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),
  lastName: z.string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z.string()
    .trim()
    .max(500, "Message must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  paymentMethod: z.enum(["paypal", "venmo", "payoneer", "remitly"], {
    errorMap: () => ({ message: "Please select a valid payment method" })
  }),
  designBudget: z.string()
    .trim()
    .min(1, "Please enter your budget for 3D design")
    .max(50, "Budget must be less than 50 characters"),
});

type OrderStep = "model-check" | "upload" | "transforming" | "preview" | "form" | "success";

const CustomizePage = () => {
  const [step, setStep] = useState<OrderStep>("model-check");
  const [hasModel, setHasModel] = useState<boolean | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [stlFiles, setStlFiles] = useState<File[]>([]);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    paymentMethod: "paypal",
    designBudget: "",
  });
  const { toast } = useToast();

  const transformToToy = async (imageBase64: string) => {
    setIsTransforming(true);
    setStep("transforming");

    const readErrorMessage = async (resp: Response) => {
      try {
        const json = await resp.json();
        return typeof json?.error === "string" ? json.error : "";
      } catch {
        try {
          const text = await resp.text();
          return text;
        } catch {
          return "";
        }
      }
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/transform-to-toy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64 }),
        }
      );

      if (!response.ok) {
        const msg = await readErrorMessage(response);

        if (response.status === 402) {
          toast({
            title: "Preview unavailable",
            description:
              "AI usage limit reached for this workspace. Please add Lovable AI credits, then try again.",
            variant: "destructive",
          });
        } else if (response.status === 429) {
          toast({
            title: "Too many requests",
            description: "Please wait a moment and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Preview Failed",
            description: msg || "Failed to transform image. Please try again.",
            variant: "destructive",
          });
        }

        setStep("upload");
        return;
      }

      const data = await response.json();

      if (data.transformedImage) {
        setTransformedImage(data.transformedImage);
        setStep("preview");
        toast({
          title: "Preview Ready! ✨",
          description: "Your OC has been transformed into a 3D toy preview!",
        });
        return;
      }

      toast({
        title: "Preview Failed",
        description: "No transformed image received. Please try again.",
        variant: "destructive",
      });
      setStep("upload");
    } catch (error) {
      console.error("Transformation error:", error);
      toast({
        title: "Preview Failed",
        description:
          error instanceof Error ? error.message : "Unexpected error. Please try again.",
        variant: "destructive",
      });
      setStep("upload");
    } finally {
      setIsTransforming(false);
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setUploadedImage(base64);
        transformToToy(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const handleStlUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        if (file.size > 50 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 50MB`,
            variant: "destructive",
          });
          return false;
        }
        return true;
      });
      setStlFiles(prev => [...prev, ...validFiles]);
    }
  }, [toast]);

  const removeStlFile = (index: number) => {
    setStlFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data with Zod
    const validationResult = orderSchema.safeParse(formData);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    const validatedData = validationResult.data;
    setIsSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Check if email already has an order
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("order_number")
        .eq("customer_email", validatedData.email.toLowerCase())
        .maybeSingle();

      if (existingOrder) {
        toast({
          title: "Order Already Exists",
          description: `You already have an order (${existingOrder.order_number}). DM me on X if you need help!`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Get next order number
      const { data: lastOrder } = await supabase
        .from("orders")
        .select("order_number")
        .like("order_number", "SKY-%")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let nextNum = 1;
      if (lastOrder?.order_number) {
        const match = lastOrder.order_number.match(/SKY-(\d+)/);
        if (match) {
          nextNum = parseInt(match[1], 10) + 1;
        }
      }
      const newOrderNumber = `SKY-${nextNum}`;

      // Build message with design budget and model info
      const fullMessage = [
        hasModel ? "Customer has their own 3D model" : "Customer needs 3D design",
        !hasModel ? `Design budget: ${validatedData.designBudget}` : null,
        stlFiles.length > 0 ? `Uploaded ${stlFiles.length} file(s): ${stlFiles.map(f => f.name).join(", ")}` : null,
        validatedData.message || null,
      ].filter(Boolean).join(" | ");

      // Insert order into database using validated data
      const { error: insertError } = await supabase
        .from("orders")
        .insert({
          order_number: newOrderNumber,
          customer_first_name: validatedData.firstName,
          customer_last_name: validatedData.lastName,
          customer_email: validatedData.email.toLowerCase(),
          message: fullMessage,
          payment_method: validatedData.paymentMethod,
          reference_image_url: uploadedImage || null,
          transformed_image_url: transformedImage || null,
          status: "pending",
          amount: 1250,
        });

      if (insertError) {
        throw insertError;
      }

      setOrderNumber(newOrderNumber);
      setStep("success");
      toast({
        title: "Order Placed! 🎉",
        description: `Your order number is ${newOrderNumber}. Redirecting to X...`,
      });

      // Redirect to X after a short delay
      setTimeout(() => {
        window.open("https://x.com/whatsupskylar", "_blank");
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetOrder = () => {
    setStep("model-check");
    setHasModel(null);
    setUploadedImage(null);
    setTransformedImage(null);
    setUploadedFile(null);
    setStlFiles([]);
    setOrderNumber(null);
    setFormData({ firstName: "", lastName: "", email: "", message: "", paymentMethod: "paypal", designBudget: "" });
  };

  const handleModelChoice = (hasOwnModel: boolean) => {
    setHasModel(hasOwnModel);
    if (hasOwnModel) {
      setStep("form");
    } else {
      setStep("upload");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Floating decorations */}
        <div className="fixed top-32 left-8 animate-float opacity-60 pointer-events-none">
          <Star className="w-8 h-8 text-accent fill-accent/50" />
        </div>
        <div className="fixed top-48 right-12 animate-float-delayed opacity-50 pointer-events-none">
          <Heart className="w-6 h-6 text-primary fill-primary/50" />
        </div>
        <div className="fixed bottom-32 left-16 animate-float opacity-40 pointer-events-none">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Wand2 className="w-4 h-4" />
            <span className="text-sm font-medium">Custom 3D Toys</span>
            <Sparkles className="w-4 h-4 animate-sparkle" />
          </div>
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            Create Your <span className="text-gradient animate-shimmer-text">Custom Toy</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Premium 3D printed collectibles starting at <strong className="text-primary">$1,250 USD</strong>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {["Start", "Details", "Order", "Done"].map((label, index) => {
            const stepMapping: Record<OrderStep, number> = {
              "model-check": 0,
              "upload": 1,
              "transforming": 1,
              "preview": 1,
              "form": 2,
              "success": 3,
            };
            const currentStepIndex = stepMapping[step];
            const isActive = index <= currentStepIndex;
            
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-500 transform
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-glow scale-110" 
                    : "bg-muted text-muted-foreground"
                  }
                  ${step === "transforming" && index === 1 ? "animate-pulse-glow" : ""}
                  ${isActive ? "animate-pop-in" : ""}
                `}>
                  {step === "transforming" && index === 1 ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`hidden sm:block text-sm transition-colors duration-300 ${isActive ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-8 h-1 rounded-full transition-all duration-500 ${isActive ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="animate-scale-in">
          {/* Model Check Step */}
          {step === "model-check" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileBox className="w-12 h-12 text-primary" />
              </div>
              
              <h2 className="font-handwritten text-3xl text-foreground mb-4">
                Do You Have a 3D Model?
              </h2>
              <p className="text-muted-foreground mb-8">
                If you already have an STL file or 3D model ready, you can upload it directly. 
                Otherwise, I'll design a custom 3D model for you based on your character artwork.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <button
                  onClick={() => handleModelChoice(true)}
                  className="glass-card p-6 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-left group"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Yes, I Have a Model</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your STL or other 3D files and I'll print it for you.
                  </p>
                </button>

                <button
                  onClick={() => handleModelChoice(false)}
                  className="glass-card p-6 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-left group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Wand2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">No, Design It For Me</h3>
                  <p className="text-sm text-muted-foreground">
                    I'll create a custom 3D model based on your character artwork.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">
                    <Sparkles className="w-3 h-3" />
                    Professional 3D illustration (paid service)
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === "upload" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              
              <h2 className="font-handwritten text-3xl text-foreground mb-4">
                Upload Your OC
              </h2>
              <p className="text-muted-foreground mb-8">
                Share your anime original character image and I'll transform it 
                into an adorable 3D toy preview! Accepted formats: PNG, JPG, WEBP
              </p>
              
              <label className="cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-glow">
                  <Image className="w-16 h-16 text-primary/40 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-foreground font-semibold mb-2">Click to upload or drag & drop</p>
                  <p className="text-muted-foreground text-sm">Max file size: 10MB</p>
                </div>
              </label>

              <div className="mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
                <div className="flex items-center justify-center gap-2 text-accent mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">3D Design Service</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  3D model design is a <strong>paid service</strong> as it involves professional 3D illustration artwork. 
                  You'll tell me your budget in the next step!
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={() => setStep("model-check")}
                className="mt-6"
              >
                ← Back
              </Button>
            </div>
          )}

          {step === "transforming" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="relative w-32 h-32 mx-auto mb-8">
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Your OC"
                    className="w-full h-full object-cover rounded-2xl opacity-50 animate-pulse"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                    <Wand2 className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-primary animate-sparkle" />
                <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-accent animate-sparkle" style={{ animationDelay: "0.3s" }} />
                <Star className="absolute top-0 left-0 w-5 h-5 text-accent fill-accent animate-twinkle" style={{ animationDelay: "0.5s" }} />
                <Heart className="absolute bottom-0 right-0 w-5 h-5 text-primary fill-primary animate-heartbeat" />
              </div>
              
              <h2 className="font-handwritten text-3xl text-foreground mb-4 animate-pulse-soft">
                Creating Your Preview ✨
              </h2>
              <p className="text-muted-foreground mb-4">
                Transforming your OC into a cute 3D toy...
              </p>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground animate-pulse">This may take a moment</span>
              </div>
              
              <div className="mt-6 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 rounded-full bg-primary animate-pulse" 
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "preview" && transformedImage && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto animate-pop-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary animate-sparkle" />
                  <h2 className="font-handwritten text-3xl text-foreground">
                    Your 3D Toy Preview!
                  </h2>
                  <Sparkles className="w-6 h-6 text-primary animate-sparkle" style={{ animationDelay: "0.5s" }} />
                </div>
                <p className="text-muted-foreground">
                  Here's how your custom toy will look. Ready to order?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center group">
                  <p className="text-sm text-muted-foreground mb-3">Your Original OC</p>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted/20 border-2 border-muted group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-soft">
                    {uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Original OC"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                </div>

                <div className="text-center group">
                  <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-accent fill-accent animate-twinkle" />
                    3D Toy Preview
                    <Star className="w-4 h-4 text-accent fill-accent animate-twinkle" style={{ animationDelay: "0.3s" }} />
                  </p>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 relative group-hover:shadow-glow transition-all duration-500">
                    <img
                      src={transformedImage}
                      alt="3D Toy Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Sparkles className="w-6 h-6 text-primary animate-sparkle" />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-block bg-primary/10 rounded-2xl px-8 py-4 animate-pulse-soft">
                  <p className="text-sm text-muted-foreground mb-1">Custom Toy Price</p>
                  <p className="font-handwritten text-4xl text-primary">$1,250 USD</p>
                  <p className="text-xs text-muted-foreground mt-1">+ 3D design fee (you choose your budget)</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setStep("form")}
                    className="btn-kawaii text-lg px-8 py-6 group"
                  >
                    <Heart className="w-5 h-5 mr-2 group-hover:animate-heartbeat" />
                    I Love It! Order Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={resetOrder}
                    className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                  >
                    Try Different Image
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto animate-slide-up">
              {transformedImage && (
                <div className="flex justify-center mb-8">
                  <div className="relative group">
                    <img
                      src={transformedImage}
                      alt="Your 3D Toy"
                      className="w-32 h-32 object-cover rounded-2xl border-2 border-primary/30 group-hover:scale-110 transition-transform duration-300"
                    />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-sparkle" />
                    <Heart className="absolute -bottom-2 -left-2 w-5 h-5 text-primary fill-primary animate-heartbeat" />
                  </div>
                </div>
              )}

              <h2 className="font-handwritten text-3xl text-foreground mb-6 text-center">
                Complete Your Order
              </h2>

              {/* STL Upload Section (only if hasModel is true) */}
              {hasModel && (
                <div className="mb-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <Label className="text-green-600 dark:text-green-400 font-semibold mb-3 block">
                    Upload Your 3D Model Files
                  </Label>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".stl,.obj,.fbx,.3ds,.blend,.ply,.gltf,.glb"
                      multiple
                      onChange={handleStlUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-green-500/30 rounded-xl p-4 hover:border-green-500/60 hover:bg-green-500/5 transition-all text-center">
                      <FileBox className="w-8 h-8 text-green-500/60 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload STL, OBJ, FBX, or other 3D files (max 50MB each)
                      </p>
                    </div>
                  </label>
                  {stlFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {stlFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                          <span className="text-sm text-foreground truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeStlFile(index)}
                            className="text-destructive hover:text-destructive/80 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Your first name"
                      className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Your last name"
                      className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Design Budget (only if they don't have a model) */}
                {!hasModel && (
                  <div className="space-y-2">
                    <Label htmlFor="designBudget" className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      3D Design Budget
                    </Label>
                    <Input
                      id="designBudget"
                      value={formData.designBudget}
                      onChange={(e) => setFormData(prev => ({ ...prev, designBudget: e.target.value }))}
                      placeholder="How much are you comfortable paying for the 3D design? (e.g., $200, $500)"
                      className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <p className="text-xs text-muted-foreground">
                      3D design is a professional service. We'll discuss final pricing on X.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Special Requests (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any special requests or notes..."
                    className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all min-h-[80px]"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Preferred Payment Method</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-muted hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02]">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-muted hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02]">
                      <RadioGroupItem value="venmo" id="venmo" />
                      <Label htmlFor="venmo" className="cursor-pointer">Venmo</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-muted hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02]">
                      <RadioGroupItem value="payoneer" id="payoneer" />
                      <Label htmlFor="payoneer" className="cursor-pointer">Payoneer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-muted hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02]">
                      <RadioGroupItem value="remitly" id="remitly" />
                      <Label htmlFor="remitly" className="cursor-pointer">Remitly</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll discuss final payment details on X
                  </p>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-center animate-pulse-soft">
                  <p className="text-sm text-muted-foreground mb-1">Base Price</p>
                  <p className="font-handwritten text-3xl text-primary">$1,250 USD</p>
                  {!hasModel && (
                    <p className="text-xs text-muted-foreground mt-1">+ 3D design fee (based on your budget)</p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="btn-kawaii w-full text-lg py-6 group">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-sparkle" />
                      Place Order & Chat on X
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto animate-pop-in">
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500 animate-pop-in" />
              </div>
              
              {/* Celebration confetti */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                      left: `${10 + (i * 8)}%`,
                      animationDelay: `${i * 0.1}s`,
                      backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--sky))',
                      width: '8px',
                      height: '8px',
                      borderRadius: i % 2 === 0 ? '50%' : '0',
                    }}
                  />
                ))}
              </div>
              
              <h2 className="font-handwritten text-4xl text-foreground mb-4">
                Order Confirmed! 🎉
              </h2>

              {/* Display Order Number */}
              {orderNumber && (
                <div className="bg-primary/10 rounded-2xl px-8 py-4 mb-6 inline-block">
                  <p className="text-sm text-muted-foreground mb-1">Your Order Number</p>
                  <p className="font-handwritten text-4xl text-primary">{orderNumber}</p>
                </div>
              )}
              
              <p className="text-muted-foreground mb-8 text-lg">
                <strong>DM me on X (@whatsupskylar) with your order number "{orderNumber}"</strong> to discuss payment and finalize your order. 
                Can't wait to create your toy! 💕
              </p>

              {transformedImage && (
                <div className="mb-8 relative inline-block">
                  <img
                    src={transformedImage}
                    alt="Your Custom Toy"
                    className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-primary/30 shadow-glow animate-float-subtle"
                  />
                  <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-primary animate-sparkle" />
                  <Heart className="absolute -bottom-3 -left-3 w-7 h-7 text-primary fill-primary animate-heartbeat" />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground animate-slide-in-bottom">
                  <Package className="w-5 h-5" />
                  <span>Estimated delivery: 2-3 weeks after payment</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={resetOrder} variant="outline" className="rounded-xl hover:scale-105 transition-transform">
                    Order Another
                  </Button>
                  <Button asChild className="btn-kawaii group">
                    <a href="https://x.com/whatsupskylar" target="_blank" rel="noopener noreferrer">
                      <Heart className="w-4 h-4 mr-2 group-hover:animate-heartbeat" />
                      DM Me on X
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
