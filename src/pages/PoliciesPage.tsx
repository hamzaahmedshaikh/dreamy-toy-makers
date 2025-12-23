import { FileText, Clock, Truck, DollarSign, HelpCircle } from "lucide-react";

const PoliciesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            My <span className="text-gradient">Policies</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know about ordering from me
          </p>
        </div>

        <div className="space-y-8 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {/* Order Cancellation Policy */}
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Cancellations
                </h2>
                <p className="text-muted-foreground">
                  You can cancel within 12 hours of placing your order
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Cancel within 12 hours and I'll process your refund right away</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>After 12 hours, I've already started working on your toy so cancellations aren't possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Need to cancel? DM me on X (@whatsupskylar) ASAP</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Return Policy */}
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Returns
                </h2>
                <p className="text-muted-foreground">
                  Each toy is custom-made just for you
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Since every toy is made specifically for your OC, I can't accept returns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>BUT if your toy arrives damaged, reach out and I'll make it right - I'll either remake it or refund you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>I take photos of every toy before shipping so we can compare if there's any damage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Refunds
                </h2>
                <p className="text-muted-foreground">
                  Fair refund policy for everyone
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>Within 12 hours:</strong> Full refund minus 20% (covers design work I've already done)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>After 12 hours:</strong> No refunds since production has started</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>Damaged items:</strong> Full replacement or refund, your choice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Refunds are processed within 5-7 business days</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Shipping Policy */}
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Shipping
                </h2>
                <p className="text-muted-foreground">
                  I ship worldwide from Florida
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>USA:</strong> 1-2 weeks delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>International:</strong> 2-4 weeks depending on your location</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Every order includes tracking so you can follow your toy's journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Shipping costs are calculated based on your location and aren't included in the $489 price</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Production Time */}
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-handwritten text-3xl text-foreground mb-2">
                  Production Time
                </h2>
                <p className="text-muted-foreground">
                  Each toy is handcrafted with care
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Production typically takes 1-2 weeks depending on complexity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>I'll send you progress photos as I work on your toy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>During busy periods, it might take a bit longer - I'll always keep you updated</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-handwritten text-3xl text-foreground mb-4">
              Got Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm always happy to help! Just DM me on X and I'll get back to you ASAP.
            </p>
            <a
              href="https://x.com/whatsupskylar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Message Me on X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;