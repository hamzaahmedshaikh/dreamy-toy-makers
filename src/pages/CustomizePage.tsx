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
    modelFileLink: "",
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
    setFormData({ firstName: "", lastName: "", email: "", message: "", paymentMethod: "paypal", designBudget: "", modelFileLink: "" });
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
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 watercolor-bg">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-4 text-sm">
            <Wand2 className="w-3.5 h-3.5" />
            <span className="font-medium">Custom 3D Toys</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-foreground mb-3">
            Create Your <span className="text-primary">Custom Toy</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Starting at <strong className="text-primary">$1,250 USD</strong>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
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
              <div key={label} className="flex items-center gap-1.5 sm:gap-2">
                <div className={`
                  w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium
                  transition-all duration-300
                  ${isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                  }
                `}>
                  {step === "transforming" && index === 1 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`hidden sm:block text-xs transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-6 sm:w-8 h-0.5 rounded-full transition-all ${isActive ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div>
          {/* Model Check Step */}
          {step === "model-check" && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-5">
                <FileBox className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              
              <h2 className="text-xl sm:text-2xl text-foreground mb-3">
                Do You Have a 3D Model?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                If you have an STL file ready, share it with me. Otherwise, I'll design a custom 3D model based on your artwork.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleModelChoice(true)}
                  className="glass-card p-5 rounded-xl text-left transition-all duration-200 hover:border-primary/30"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Yes, I Have a Model</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your 3D files via cloud link
                  </p>
                </button>

                <button
                  onClick={() => handleModelChoice(false)}
                  className="glass-card p-5 rounded-xl text-left transition-all duration-200 hover:border-primary/30"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center mb-3">
                    <Wand2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">No, Design It For Me</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom 3D design (paid service)
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === "upload" && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-5">
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              
              <h2 className="text-xl sm:text-2xl text-foreground mb-3">
                Upload Your OC
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Share your character image. Accepted: PNG, JPG, WEBP
              </p>
              
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary/20 rounded-xl p-6 sm:p-8 hover:border-primary/40 hover:bg-primary/2 transition-all">
                  <Image className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                  <p className="text-foreground font-medium mb-1">Click to upload</p>
                  <p className="text-muted-foreground text-sm">Max 10MB</p>
                </div>
              </label>

              <div className="mt-6 p-4 bg-accent/30 rounded-xl">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> 3D design is a paid service. You'll set your budget next.
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={() => setStep("model-check")}
                className="mt-5 text-sm"
              >
                ← Back
              </Button>
            </div>
          )}

          {step === "transforming" && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Your OC"
                    className="w-full h-full object-cover rounded-xl opacity-50"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                    <Loader2 className="w-7 h-7 text-primary animate-spin" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl text-foreground mb-2">
                Creating Preview...
              </h2>
              <p className="text-sm text-muted-foreground">
                This may take a moment
              </p>
            </div>
          )}

          {step === "preview" && transformedImage && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl text-foreground mb-2">
                  Your 3D Toy Preview
                </h2>
                <p className="text-sm text-muted-foreground">
                  Ready to order?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Original</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted/20 border border-border">
                    {uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Original OC"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">3D Preview</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-primary/5 border border-primary/20">
                    <img
                      src={transformedImage}
                      alt="3D Toy Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="inline-block bg-primary/8 rounded-full px-5 py-2">
                  <span className="text-sm text-muted-foreground">Starting at </span>
                  <span className="text-lg font-semibold text-primary">$1,250</span>
                </div>
              </div>
                
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setStep("form")}
                  className="btn-kawaii rounded-full"
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  Order Now
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetOrder}
                  className="rounded-full"
                >
                  Try Different Image
                </Button>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto">
              {transformedImage && (
                <div className="flex justify-center mb-5">
                  <img
                    src={transformedImage}
                    alt="Your 3D Toy"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-primary/20"
                  />
                </div>
              )}

              <h2 className="text-xl sm:text-2xl text-foreground mb-5 text-center">
                Complete Your Order
              </h2>

              {/* 3D Model Sharing Section (only if hasModel is true) */}
              {hasModel && (
                <div className="mb-5 p-4 bg-secondary/30 rounded-xl">
                  <Label htmlFor="modelFileLink" className="text-primary font-medium mb-2 block text-sm">
                    Share Your 3D Model Files
                  </Label>
                  <div className="text-center mb-3">
                    <p className="text-sm text-muted-foreground">
                      Google Drive, Dropbox, WeTransfer, etc.
                    </p>
                  </div>
                  <Input
                    id="modelFileLink"
                    type="url"
                    placeholder="Paste your file link here..."
                    value={formData.modelFileLink}
                    onChange={(e) => setFormData({ ...formData, modelFileLink: e.target.value })}
                    className="bg-background/50 rounded-lg text-sm"
                  />
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-sm">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="First name"
                      className="rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Last name"
                      className="rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="rounded-lg text-sm"
                  />
                </div>

                {/* Design Budget (only if they don't have a model) */}
                {!hasModel && (
                  <div className="space-y-1.5">
                    <Label htmlFor="designBudget" className="text-sm">3D Design Budget</Label>
                    <Input
                      id="designBudget"
                      value={formData.designBudget}
                      onChange={(e) => setFormData(prev => ({ ...prev, designBudget: e.target.value }))}
                      placeholder="e.g., $200, $500"
                      className="rounded-lg text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll discuss final pricing on X
                    </p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm">Special Requests (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any special requests..."
                    className="rounded-lg text-sm min-h-[60px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Payment Method</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    className="grid grid-cols-2 gap-2"
                  >
                    {["paypal", "venmo", "payoneer", "remitly"].map((method) => (
                      <div key={method} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer">
                        <RadioGroupItem value={method} id={method} />
                        <Label htmlFor={method} className="cursor-pointer text-sm capitalize">{method}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <span className="text-sm text-muted-foreground">Base Price: </span>
                  <span className="text-lg font-semibold text-primary">$1,250</span>
                  {!hasModel && (
                    <span className="text-xs text-muted-foreground block mt-1">+ design fee</span>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="btn-kawaii w-full rounded-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              
              <h2 className="text-xl sm:text-2xl text-foreground mb-3">
                Order Confirmed!
              </h2>

              {orderNumber && (
                <div className="bg-primary/8 rounded-full px-5 py-2 mb-4 inline-block">
                  <span className="text-xs text-muted-foreground">Order: </span>
                  <span className="text-base font-semibold text-primary">{orderNumber}</span>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mb-5">
                DM me on X <strong>@whatsupskylar</strong> with your order number to finalize payment.
              </p>

              {transformedImage && (
                <div className="mb-5">
                  <img
                    src={transformedImage}
                    alt="Your Custom Toy"
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl mx-auto border border-primary/20"
                  />
                </div>
              )}

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  Delivery: 2-3 weeks after payment
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetOrder} variant="outline" className="rounded-full text-sm">
                    Order Another
                  </Button>
                  <Button asChild className="btn-kawaii rounded-full text-sm">
                    <a href="https://x.com/whatsupskylar" target="_blank" rel="noopener noreferrer">
                      DM on X
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
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
