import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Sparkles, CheckCircle, Twitter, Heart, Package, ArrowRight, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OrderStep = "upload" | "preview" | "form" | "success";

const CustomizePage = () => {
  const [step, setStep] = useState<OrderStep>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    paypalEmail: "",
  });
  const { toast } = useToast();

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
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setStep("preview");
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

    // For now, just show success - email functionality will need Cloud
    setStep("success");
    toast({
      title: "Order Placed! 🎉",
      description: "Please complete your payment via PayPal",
    });
  };

  const resetOrder = () => {
    setStep("upload");
    setUploadedImage(null);
    setFormData({ firstName: "", lastName: "", paypalEmail: "" });
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
            Upload your anime OC and see the magic happen! ✨
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {["Upload", "Preview", "Details", "Done"].map((label, index) => {
            const stepIndex = ["upload", "preview", "form", "success"].indexOf(step);
            const isActive = index <= stepIndex;
            
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "bg-muted text-muted-foreground"
                  }
                `}>
                  {index + 1}
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
                Share your anime original character image and we'll transform it 
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
            </div>
          )}

          {step === "preview" && uploadedImage && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Your 3D Toy Preview ✨
                </h2>
                <p className="text-muted-foreground">
                  Here's how your custom toy will look!
                </p>
              </div>

              {/* 3D Toy Preview Mockup */}
              <div className="relative mb-8">
                <div className="aspect-square max-w-sm mx-auto relative">
                  {/* Toy base/platform */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cream to-sky rounded-3xl shadow-card overflow-hidden">
                    {/* Character image with toy-like styling */}
                    <div className="absolute inset-4 rounded-2xl overflow-hidden border-4 border-rose-light/50 shadow-soft">
                      <img
                        src={uploadedImage}
                        alt="Your OC"
                        className="w-full h-full object-cover"
                      />
                      {/* Toy shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                    </div>
                    
                    {/* Decorative elements */}
                    <Sparkles className="absolute top-2 right-2 w-6 h-6 text-primary animate-sparkle" />
                    <Heart className="absolute bottom-2 left-2 w-5 h-5 text-primary fill-primary animate-pulse" />
                  </div>
                  
                  {/* Platform shadow */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-rose/20 rounded-full blur-md" />
                </div>
              </div>

              {/* Toy Info */}
              <div className="bg-primary/5 rounded-2xl p-4 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 text-foreground mb-1">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Custom 3D Printed Toy</span>
                </div>
                <p className="text-3xl font-bold text-foreground">$200 USD</p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={resetOrder}>
                  Upload Different Image
                </Button>
                <Button variant="hero" className="flex-1" onClick={() => setStep("form")}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto">
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

                {/* Order Summary */}
                <div className="bg-primary/5 rounded-2xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">Order Summary</h3>
                  <div className="flex items-center gap-3">
                    {uploadedImage && (
                      <img src={uploadedImage} alt="Your OC" className="w-16 h-16 rounded-xl object-cover" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium">Custom 3D Anime Toy</p>
                      <p className="text-muted-foreground text-sm">Based on your OC</p>
                    </div>
                    <p className="text-xl font-bold text-foreground">$200</p>
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
              
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                <strong>Once you accept the payment on PayPal</strong>, please share your 
                payment screenshot on X (Twitter) to confirm your order!
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
                    <span>Complete the payment of $200 USD</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">3</span>
                    <span>Take a screenshot of your payment confirmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">4</span>
                    <span>Share it on X by tagging @whatsupskylar</span>
                  </li>
                </ol>
              </div>

              <a
                href="https://x.com/whatsupskylar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Twitter className="w-5 h-5" />
                  Go to @whatsupskylar on X
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>

              <Button
                variant="ghost"
                className="mt-4"
                onClick={resetOrder}
              >
                Place Another Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
