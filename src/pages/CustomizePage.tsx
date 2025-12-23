import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Sparkles, CheckCircle, Twitter, Heart, Package, ArrowRight, Image, Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

type OrderStep = "upload" | "transforming" | "preview" | "form" | "success";

const CustomizePage = () => {
  const [step, setStep] = useState<OrderStep>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    paypalEmail: "",
    message: "",
    paymentMethod: "paypal",
  });
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init("AguvgiZG-z9aRnJhH");
  }, []);

  const transformToToy = async (imageBase64: string) => {
    setIsTransforming(true);
    setStep("transforming");
    
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to transform image");
      }

      const data = await response.json();
      
      if (data.transformedImage) {
        setTransformedImage(data.transformedImage);
        setStep("preview");
        toast({
          title: "Preview Ready! ✨",
          description: "Your OC has been transformed into a 3D toy preview!",
        });
      } else {
        throw new Error("No transformed image received");
      }
    } catch (error) {
      console.error("Transformation error:", error);
      toast({
        title: "Preview Failed",
        description: error instanceof Error ? error.message : "Please try again",
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
        // Automatically generate preview
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

    try {
      // Generate order number
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const orderNumber = `SKY-${timestamp}-${random}`;

      // Send email to Skylar (admin) with order details
      const adminRes = await emailjs.send(
        "service_3kq9rho",
        "template_2cb6uc7",
        {
          order_number: orderNumber,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.paypalEmail,
          payment_method: formData.paymentMethod,
          message: formData.message || "No message provided",
        }
      );
      console.log("EmailJS admin email sent:", adminRes);

      // Send confirmation email to customer
      const customerRes = await emailjs.send(
        "service_3kq9rho",
        "template_kpvs4u7",
        {
          order_number: orderNumber,
          customer_name: formData.firstName,
          customer_email: formData.paypalEmail,
          payment_method: formData.paymentMethod,
        }
      );
      console.log("EmailJS customer email sent:", customerRes);

      // Send reference + preview images to Skylar via backend email (supports attachments)
      try {
        const fnRes = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-emails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              customerEmail: formData.paypalEmail,
              paymentMethod: formData.paymentMethod,
              message: formData.message || "No message provided",
              referenceImageBase64: uploadedImage || "",
              transformedImageBase64: transformedImage || "",
              sendCustomer: false,
            }),
          }
        );

        const fnData = await fnRes.json().catch(() => ({}));
        console.log("Backend admin attachments email response:", fnData);

        if (!fnRes.ok) {
          console.warn("Backend email failed (attachments):", fnData);
        }
      } catch (err) {
        console.warn("Backend email failed (attachments):", err);
      }

      setStep("success");
      toast({
        title: "Order Placed! 🎉",
        description: `Order #${orderNumber} confirmed! Check your email.`,
      });
    } catch (error: any) {
      const errInfo = {
        message: error?.message,
        text: error?.text,
        status: error?.status,
        name: error?.name,
      };
      console.error("Order email sending failed:", error);
      console.error("EmailJS error details:", errInfo);

      setStep("success");
      toast({
        title: "Order Placed (Email Failed)",
        description:
          errInfo.text || errInfo.message || "Email provider error. Please message me on X to confirm.",
        variant: "destructive",
      });
    }
  };

  const resetOrder = () => {
    setStep("upload");
    setUploadedImage(null);
    setTransformedImage(null);
    setUploadedFile(null);
    setFormData({ firstName: "", lastName: "", paypalEmail: "", message: "", paymentMethod: "paypal" });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            Create Your <span className="text-gradient">Custom Toy</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Upload your anime OC and my AI will transform it into a 3D toy! ✨
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
                  transition-all duration-300
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "bg-muted text-muted-foreground"
                  }
                  ${step === "transforming" && index === 1 ? "animate-pulse" : ""}
                `}>
                  {step === "transforming" && index === 1 ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`hidden sm:block text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-8 h-0.5 ${isActive ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="animate-scale-in">
          {step === "upload" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 bounce-gentle">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              
              <h2 className="font-handwritten text-3xl text-foreground mb-4">
                Upload Your OC
              </h2>
              <p className="text-muted-foreground mb-8">
                Share your anime original character image and my AI will transform it 
                into an adorable 3D toy! Accepted formats: PNG, JPG, WEBP
              </p>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                  <Image className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <p className="text-foreground font-semibold mb-2">Click to upload or drag & drop</p>
                  <p className="text-muted-foreground text-sm">Max file size: 10MB</p>
                </div>
              </label>

              <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Wand2 className="w-5 h-5" />
                  <span className="font-semibold">Instant Preview</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  My AI will automatically convert your character into a cute chibi 3D toy style!
                </p>
              </div>
            </div>
          )}

          {step === "transforming" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="relative w-32 h-32 mx-auto mb-8">
                {/* Original image thumbnail */}
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Your OC"
                    className="w-full h-full object-cover rounded-2xl opacity-50"
                  />
                )}
                {/* Spinning overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <Wand2 className="w-10 h-10 text-primary animate-bounce" />
                  </div>
                </div>
                {/* Sparkles */}
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-primary animate-sparkle" />
                <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-primary animate-sparkle" style={{ animationDelay: "0.3s" }} />
              </div>
              
              <h2 className="font-handwritten text-3xl text-foreground mb-4">
                Creating Your Preview ✨
              </h2>
              <p className="text-muted-foreground mb-4">
                My AI is transforming your OC into a cute 3D toy...
              </p>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">This may take a moment</span>
              </div>
            </div>
          )}

          {step === "preview" && transformedImage && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Your 3D Toy Preview! ✨
                </h2>
                <p className="text-muted-foreground">
                  Here's how your custom toy will look. Ready to order?
                </p>
              </div>

              {/* Side by side comparison */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Original */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">Your Original OC</p>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted/20 border-2 border-muted">
                    {uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Original OC"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Transformed */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">3D Toy Preview</p>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 relative">
                    <img
                      src={transformedImage}
                      alt="3D Toy Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Sparkles className="w-6 h-6 text-primary animate-sparkle" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="text-center space-y-4">
                <div className="inline-block bg-primary/10 rounded-2xl px-8 py-4">
                  <p className="text-sm text-muted-foreground mb-1">Custom Toy Price</p>
                  <p className="font-handwritten text-4xl text-primary">$1,299 USD</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setStep("form")}
                    className="btn-kawaii text-lg px-8 py-6"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    I Love It! Order Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={resetOrder}
                    className="text-lg px-8 py-6"
                  >
                    Try Different Image
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto">
              {/* Show transformed image thumbnail */}
              {transformedImage && (
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <img
                      src={transformedImage}
                      alt="Your 3D Toy"
                      className="w-32 h-32 object-cover rounded-2xl border-2 border-primary/30"
                    />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-sparkle" />
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
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Your last name"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">PayPal Email</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    value={formData.paypalEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, paypalEmail: e.target.value }))}
                    placeholder="your@email.com"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Special Requests (Optional)</Label>
                  <Input
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any special requests or notes..."
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-muted hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-muted hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="cursor-pointer">Crypto</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="font-handwritten text-3xl text-primary">$1,299 USD</p>
                </div>

                <Button type="submit" className="btn-kawaii w-full text-lg py-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Place Order
                </Button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              
              <h2 className="font-handwritten text-4xl text-foreground mb-4">
                Order Confirmed! 🎉
              </h2>
              
              <p className="text-muted-foreground mb-8 text-lg">
                Thank you for your order! I'll start working on your custom toy right away. 
                You'll receive an email confirmation shortly.
              </p>

              {/* Show final toy preview */}
              {transformedImage && (
                <div className="mb-8">
                  <img
                    src={transformedImage}
                    alt="Your Custom Toy"
                    className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-primary/30 shadow-soft"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Package className="w-5 h-5" />
                  <span>Estimated delivery: 2-3 weeks</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={resetOrder} variant="outline" className="rounded-xl">
                    Order Another
                  </Button>
                  <Button asChild className="btn-kawaii">
                    <a href="https://x.com/yourprettysky" target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 mr-2" />
                      Follow for Updates
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
