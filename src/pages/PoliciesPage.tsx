import { FileText, Clock, Truck, DollarSign } from "lucide-react";

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
            Important information about orders, shipping, and refunds
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
                  Order Cancellation
                </h2>
                <p className="text-muted-foreground">
                  Cancellations are accepted within 12 hours of placing your order
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Important Details:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>You can cancel your order within 12 hours of placement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>After 12 hours, orders cannot be cancelled as I begin working on your toy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Contact me immediately on X (@whatsupskylar) if you need to cancel</span>
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
                  Return Policy
                </h2>
                <p className="text-muted-foreground">
                  Returns are not accepted as each toy is custom-made
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Why I Cannot Accept Returns:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Each toy is custom-made specifically based on your unique OC design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>I create one-of-a-kind items that cannot be resold or reused</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>However, if your toy arrives damaged, please contact me and I will make it right</span>
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
                  Refund Policy
                </h2>
                <p className="text-muted-foreground">
                  Refunds are available for cancellations within the 12-hour window
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Refund Details:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Cancellations within 12 hours: 80% refund (20% covers initial design work)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>After 12 hours: No refunds as production has already started</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Damaged items: Full replacement or refund at my discretion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Refunds are processed within 5-7 business days via your original payment method</span>
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
                  Shipping Policy
                </h2>
                <p className="text-muted-foreground">
                  Shipping costs are not included in the toy price
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Shipping Information:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Shipping costs vary based on your location and are calculated separately</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>I ship worldwide from Florida, USA</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Domestic (USA): 1-2 weeks delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>International: 2-4 weeks delivery depending on location</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>All orders include tracking information</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-handwritten text-3xl text-foreground mb-4">
              Questions About My Policies?
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm happy to help! Reach out to me on X (Twitter) for any questions or concerns.
            </p>
            <a
              href="https://x.com/whatsupskylar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Contact Me on X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
