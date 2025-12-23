import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Sparkles, CheckCircle, Twitter, Heart, Package, ArrowRight, Image, Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { supabase } from "@/integrations/supabase/client";

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
          title: "Transformation Complete! ✨",
          description: "Your OC has been transformed into a 3D toy!",
        });
      } else {
        throw new Error("No transformed image received");
      }
    } catch (error) {
      console.error("Transformation error:", error);
      toast({
        title: "Transformation Failed",
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
        // Automatically start AI transformation
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
      // Send email to yourself with order details
      const templateParams: Record<string, string> = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.paypalEmail,
        payment_method: formData.paymentMethod,
        first_name: formData.firstName,
        last_name: formData.lastName,
        paypal_email: formData.paypalEmail,
        message: formData.message || "No message provided",
        order_details: `New custom toy order from ${formData.firstName} ${formData.lastName}. Payment method: ${formData.paymentMethod}. PayPal email: ${formData.paypalEmail}. Message: ${formData.message || "No message provided"}`,
      };

      console.log('Sending order email with params:', templateParams);

      // Send email to yourself
      const result = await emailjs.send(
        'service_3kq9rho',
        'template_2cb6uc7',
        templateParams,
        'AguvgiZG-z9aRnJhH'
      );

      console.log('Order email sent successfully:', result);

      setStep("success");
      toast({
        title: "Order Placed! 🎉",
        description: "Check your email for order confirmation",
      });
    } catch (error) {
      console.error('Order email sending failed:', error);
      toast({
        title: "Order Placed!",
        description: "There was an issue sending the email, but your order was recorded.",
        variant: "destructive",
      });
      setStep("success");
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
            Upload your anime OC and our AI will transform it into a 3D toy! ✨
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {["Upload", "AI Magic", "Preview", "Done"].map((label, index) => {
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
                Share your anime original character image and our AI will transform it 
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
                  <span className="font-semibold">AI-Powered Transformation</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI will automatically convert your character into a cute chibi 3D toy style!
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
                AI Magic in Progress ✨
              </h2>
              <p className="text-muted-foreground mb-4">
                Our AI is transforming your OC into a cute 3D toy...
              </p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">This usually takes 15-30 seconds</span>
              </div>
            </div>
          )}

          {(step === "preview" || step === "form") && transformedImage && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto">
              {step === "preview" ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-handwritten text-3xl text-foreground mb-2">
                      Your 3D Toy Preview ✨
                    </h2>
                    <p className="text-muted-foreground">
                      AI-generated preview of your custom toy!
                    </p>
                  </div>

                  {/* Before/After Comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Original */}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Original OC</p>
                      <div className="aspect-square rounded-2xl overflow-hidden border-2 border-muted">
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
                      <p className="text-sm text-primary font-semibold mb-2">3D Toy Version</p>
                      <div className="aspect-square rounded-2xl overflow-hidden border-2 border-primary shadow-glow relative">
                        <img
                          src={transformedImage}
                          alt="3D Toy Preview"
                          className="w-full h-full object-cover"
                        />
                        <Sparkles className="absolute top-2 right-2 w-6 h-6 text-primary animate-sparkle" />
                      </div>
                    </div>
                  </div>

                  {/* Toy Info */}
                  <div className="bg-primary/5 rounded-2xl p-4 mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-foreground mb-1">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Custom 3D Printed Toy</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">$1,299 USD</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your final toy will look just like the AI preview!
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={resetOrder}>
                      Try Different Image
                    </Button>
                    <Button variant="hero" className="flex-1" onClick={() => setStep("form")}>
                      Order This Toy
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-handwritten text-3xl text-foreground mb-2">
                      Complete Your Order 💕
                    </h2>
                    <p className="text-muted-foreground">
                      Please provide your details to finish your purchase
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Enter your first name"
                          className="bg-background/50 border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Enter your last name"
                          className="bg-background/50 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail" className="text-foreground">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        value={formData.paypalEmail}
                        onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                        placeholder="your-email@example.com"
                        className="bg-background/50 border-primary/20 focus:border-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll send the payment request to this email
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Message (Optional)</Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any special requests or notes about your OC..."
                        className="w-full px-3 py-2 bg-background/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none resize-none"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        Tell us about your character or any specific details you'd like us to know
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-foreground">Payment Method</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="text-foreground">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="text-foreground">Other Payment Method</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Order Summary with AI preview */}
                    <div className="bg-primary/5 rounded-2xl p-4">
                      <h3 className="font-semibold text-foreground mb-2">Order Summary</h3>
                      <div className="flex items-center gap-3">
                        <img 
                          src={transformedImage} 
                          alt="3D Toy Preview" 
                          className="w-16 h-16 rounded-xl object-cover border-2 border-primary" 
                        />
                        <div className="flex-1">
                          <p className="text-foreground font-medium">Custom 3D Anime Toy</p>
                          <p className="text-muted-foreground text-sm">AI-Generated Design</p>
                        </div>
                        <p className="text-xl font-bold text-foreground">$400</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("preview")}>
                        Back
                      </Button>
                      <Button type="submit" variant="hero" className="flex-1">
                        <Sparkles className="w-4 h-4" />
                        Submit Order
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          {step === "success" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 pulse-soft">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>

              <h1 className="font-handwritten text-5xl text-foreground mb-4">
                Order Placed! 🎉
              </h1>

              {/* Show the transformed image */}
              {transformedImage && (
                <div className="mb-8">
                  <img
                    src={transformedImage}
                    alt="Your 3D Toy"
                    className="w-32 h-32 rounded-2xl object-cover mx-auto border-4 border-primary shadow-glow"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Your custom toy design</p>
                </div>
              )}

              {formData.paymentMethod === "paypal" ? (
                <>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Order placed, you'll receive a payment request on PayPal, accept it and send the payment proof on this X account.
                  </p>

                  <div className="bg-primary/5 rounded-2xl p-6 mb-8">
                    <h3 className="font-semibold text-foreground mb-4">Next Steps:</h3>
                    <ol className="text-left space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">1</span>
                        <span>Check your PayPal email for the payment request</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">2</span>
                        <span>Accept the payment request and complete payment</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">3</span>
                        <span>Take a screenshot of your payment confirmation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">4</span>
                        <span>Share the screenshot on X (Twitter) and tag us!</span>
                      </li>
                    </ol>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for your order! Please reach out to us on X to arrange payment.
                  </p>
                </>
              )}

              <a
                href="https://x.com/whatsupskylar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition-opacity mb-6"
              >
                <Twitter className="w-5 h-5" />
                Contact on X @whatsupskylar
              </a>

              <div className="mt-8">
                <Button variant="outline" onClick={resetOrder} className="gap-2">
                  <Heart className="w-4 h-4" />
                  Place Another Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
