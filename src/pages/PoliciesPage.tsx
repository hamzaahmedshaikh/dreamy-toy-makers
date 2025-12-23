import { Clock, RotateCcw, DollarSign, Truck, Hammer, MessageCircle, Camera, Shield, Heart, Sparkles, Star } from "lucide-react";

const PoliciesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Floating decorations */}
        <div className="fixed top-32 left-8 animate-float opacity-50 pointer-events-none">
          <Heart className="w-6 h-6 text-primary fill-primary/30" />
        </div>
        <div className="fixed top-56 right-12 animate-float-delayed opacity-40 pointer-events-none">
          <Star className="w-8 h-8 text-accent fill-accent/30" />
        </div>
        <div className="fixed bottom-40 left-16 animate-wiggle-slow opacity-30 pointer-events-none">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 animate-bounce-gentle">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Clear & Fair Policies</span>
          </div>
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            How Things <span className="text-gradient">Work</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Quick rundown so you know what to expect when ordering from me 💕
          </p>
        </div>

        <div className="space-y-8">
          {/* Cancellations */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 animate-slide-in-bottom hover:shadow-glow transition-all duration-500 hover:scale-[1.01]" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-gentle">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Cancellations</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>If you need to cancel, DM me on X (@whatsupskylar) within <strong className="text-foreground">12 hours</strong> of ordering and I'll refund you.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>After that window, I've already started production—so cancellations won't be possible.</span>
              </li>
            </ul>
          </div>

          {/* Returns */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 animate-slide-in-bottom hover:shadow-glow transition-all duration-500 hover:scale-[1.01]" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-gentle">
                <RotateCcw className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Returns</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>Every toy is custom-made for your character, so I can't accept returns for change of mind.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>If your toy arrives damaged and you purchased shipping insurance, send me photos and I'll either remake it or give you a full refund—your choice.</span>
              </li>
            </ul>
          </div>

          {/* Refunds */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 animate-slide-in-bottom hover:shadow-glow transition-all duration-500 hover:scale-[1.01]" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-gentle">
                <DollarSign className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Refunds</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span><strong className="text-foreground">Within 12 hours:</strong> Full refund (minus 20% to cover the design work I've already done).</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span><strong className="text-foreground">After 12 hours:</strong> No refunds—production is underway at that point.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span><strong className="text-foreground">Damaged on arrival (with insurance):</strong> Full replacement or refund, no questions asked.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>Refunds are processed within 5–7 business days.</span>
              </li>
            </ul>
          </div>

          {/* Pre-Dispatch Documentation */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 animate-slide-in-bottom hover:shadow-glow transition-all duration-500 hover:scale-[1.01]" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-gentle">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Pre-Dispatch Documentation</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>Before dispatching your order, I will send you <strong className="text-foreground">photos and/or videos</strong> of your completed toy to confirm everything looks perfect.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>This documentation serves as proof that your toy was in <strong className="text-foreground">perfect condition</strong> when it left my hands.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>I will only ship after you confirm you're happy with how it looks!</span>
              </li>
            </ul>
          </div>

          {/* Shipping */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 animate-slide-in-bottom hover:shadow-glow transition-all duration-500 hover:scale-[1.01]" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-gentle">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Shipping & Insurance</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span><strong className="text-foreground">USA:</strong> Typically 1–2 weeks after the toy is finished.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span><strong className="text-foreground">International:</strong> 2–4 weeks depending on destination.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>You'll get a tracking number as soon as your toy ships.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>Shipping is calculated separately based on your location.</span>
              </li>
            </ul>
            
            {/* Insurance Notice */}
            <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-accent/30 animate-pulse-soft">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Shipping Insurance Available</p>
                  <p className="text-sm text-muted-foreground">
                    You can <strong>insure your shipment</strong> for additional charges. This protects you if your parcel arrives damaged during transit.
                  </p>
                </div>
              </div>
            </div>

            {/* Damage Disclaimer */}
            <div className="mt-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> I cannot be held responsible for damage that occurs during shipping transit. I provide pre-dispatch documentation to prove items were in perfect condition when shipped. For peace of mind, I highly recommend purchasing shipping insurance.
              </p>
            </div>
          </div>

          {/* Production Time */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 animate-slide-in-bottom hover:shadow-glow transition-all duration-500 hover:scale-[1.01]" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-gentle">
                <Hammer className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Production Time</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>Most orders take <strong className="text-foreground">1–2 weeks</strong> to produce.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>I'll keep you updated with progress pics along the way.</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.65s" }}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse"></span>
                <span>During busy periods it might take a bit longer—I'll always let you know upfront.</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 text-center animate-slide-in-bottom hover:shadow-glow transition-all duration-500" style={{ animationDelay: "0.6s" }}>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-handwritten text-3xl text-foreground mb-3">
              Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              If anything's unclear, just hit me up on X—I'm happy to help! 💕
            </p>
            <a
              href="https://x.com/whatsupskylar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-glow group"
            >
              <Heart className="w-4 h-4 group-hover:animate-heartbeat" />
              DM Me on X
              <Sparkles className="w-4 h-4 group-hover:animate-sparkle" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
