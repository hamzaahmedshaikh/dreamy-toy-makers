import { Clock, RotateCcw, DollarSign, Truck, Hammer, MessageCircle } from "lucide-react";

const PoliciesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            How Things <span className="text-gradient">Work</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Quick rundown so you know what to expect when ordering from me
          </p>
        </div>

        <div className="space-y-8 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {/* Cancellations */}
          <div className="glass-card rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Cancellations</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>If you need to cancel, DM me on X (@whatsupskylar) within <strong>12 hours</strong> of ordering and I'll refund you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>After that window, I've already started production—so cancellations won't be possible.</span>
              </li>
            </ul>
          </div>

          {/* Returns */}
          <div className="glass-card rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <RotateCcw className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Returns</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>Every toy is custom-made for your character, so I can't accept returns for change of mind.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>If your toy arrives damaged, send me photos and I'll either remake it or give you a full refund—your choice.</span>
              </li>
            </ul>
          </div>

          {/* Refunds */}
          <div className="glass-card rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Refunds</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span><strong>Within 12 hours:</strong> Full refund (minus 20% to cover the design work I've already done).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span><strong>After 12 hours:</strong> No refunds—production is underway at that point.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span><strong>Damaged on arrival:</strong> Full replacement or refund, no questions asked.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>Refunds are processed within 5–7 business days.</span>
              </li>
            </ul>
          </div>

          {/* Shipping */}
          <div className="glass-card rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Shipping</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span><strong>USA:</strong> Typically 1–2 weeks after the toy is finished.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span><strong>International:</strong> 2–4 weeks depending on destination.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>You'll get a tracking number as soon as your toy ships.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span className="text-sm">Shipping is calculated separately based on your location and added when we finalize your order.</span>
              </li>
            </ul>
          </div>

          {/* Production Time */}
          <div className="glass-card rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Hammer className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-handwritten text-3xl text-foreground">Production Time</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>Most orders take <strong>1–2 weeks</strong> to produce.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>I'll keep you updated with progress pics along the way.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>During busy periods it might take a bit longer—I'll always let you know upfront.</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-handwritten text-3xl text-foreground mb-3">
              Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              If anything's unclear, just hit me up on X—I'm happy to help!
            </p>
            <a
              href="https://x.com/whatsupskylar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              DM Me on X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
