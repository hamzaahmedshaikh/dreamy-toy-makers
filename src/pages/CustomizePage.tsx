import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Sparkles, CheckCircle, Heart, Package, ArrowRight, Image, Loader2, Wand2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OrderStep = "upload" | "transforming" | "preview" | "form" | "success";

const CustomizePage = () => {
  const [step, setStep] = useState<OrderStep>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    paypalEmail: "",
    message: "",
    paymentMethod: "paypal",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.paypalEmail.trim()) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to complete your order",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Check if email already has an order
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("order_number")
        .eq("customer_email", formData.paypalEmail.trim().toLowerCase())
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

      // Insert order into database
      const { error: insertError } = await supabase
        .from("orders")
        .insert({
          order_number: newOrderNumber,
          customer_first_name: formData.firstName.trim(),
          customer_last_name: formData.lastName.trim(),
          customer_email: formData.paypalEmail.trim().toLowerCase(),
          message: formData.message.trim() || null,
          payment_method: formData.paymentMethod,
          reference_image_url: uploadedImage || null,
          transformed_image_url: transformedImage || null,
          status: "pending",
        });

      if (insertError) {
        throw insertError;
      }

      setOrderNumber(newOrderNumber);
      setStep("success");
      toast({
        title: "Order Placed! 🎉",
        description: `Your order number is ${newOrderNumber}. DM me on X!`,
      });
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
    setStep("upload");
    setUploadedImage(null);
    setTransformedImage(null);
    setUploadedFile(null);
    setOrderNumber(null);
    setFormData({ firstName: "", lastName: "", paypalEmail: "", message: "", paymentMethod: "paypal" });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Floating decorations - gentle float only */}
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
            <span className="text-sm font-medium">Magic Transformation</span>
            <Sparkles className="w-4 h-4 animate-sparkle" />
          </div>
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            Create Your <span className="text-gradient animate-shimmer-text">Custom Toy</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Upload your anime OC and see how it'll look as a 3D toy! ✨
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {["Upload", "Creating", "Preview", "Done"].map((label, index) => {
            const stepMapping = ["upload", "transforming", "preview", "success"];
            const currentStepIndex = step === "form" ? 2 : stepMapping.indexOf(step);
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
                into an adorable 3D toy! Accepted formats: PNG, JPG, WEBP
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

              <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Wand2 className="w-5 h-5" />
                  <span className="font-semibold">Instant Preview</span>
                  <Sparkles className="w-5 h-5 animate-sparkle" />
                </div>
                <p className="text-sm text-muted-foreground">
                  I'll automatically convert your character into a cute chibi 3D toy style!
                </p>
              </div>
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
              
              {/* Magic particles - pulsing dots */}
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
                  <p className="font-handwritten text-4xl text-primary">$489 USD</p>
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
                  <Label htmlFor="paypalEmail">Email Address</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    value={formData.paypalEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, paypalEmail: e.target.value }))}
                    placeholder="your@email.com"
                    className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Special Requests (Optional)</Label>
                  <Input
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any special requests or notes..."
                    className="rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Payment Method</Label>
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
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="cursor-pointer">Crypto</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-center animate-pulse-soft">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="font-handwritten text-3xl text-primary">$489 USD</p>
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
                      Place Order
                      <Heart className="w-5 h-5 ml-2 group-hover:animate-heartbeat" />
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
                <strong>DM me on X (@whatsupskylar) with your order number "{orderNumber}"</strong> to finalize payment details and shipping. 
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
                  <span>Estimated delivery: 2-3 weeks</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={resetOrder} variant="outline" className="rounded-xl hover:scale-105 transition-transform">
                    Order Another
                  </Button>
                  <Button asChild className="btn-kawaii group">
                    <a href="https://x.com/whatsupskylar" target="_blank" rel="noopener noreferrer">
                      <Heart className="w-4 h-4 mr-2 group-hover:animate-heartbeat" />
                      Follow for Updates
                      <Sparkles className="w-4 h-4 ml-2 group-hover:animate-sparkle" />
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
