import { FileText, Clock, Truck, DollarSign } from "lucide-react";

const PoliciesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            Our <span className="text-gradient">Policies</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Important information about orders, shipping, and returns
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
                  Order Cancellation Policy
                </h2>
                <p className="text-muted-foreground">
                  Order cancellation is only valid within 12 hours of placing the order
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
                  <span>After 12 hours, orders cannot be cancelled as production begins</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Contact us immediately if you need to cancel within the 12-hour window</span>
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
                  No return policy because every product is made to order
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Why No Returns:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Each toy is custom-made specifically for your OC design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Our 3D printing process creates unique, one-of-a-kind items</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>We cannot resell or reuse custom-printed items</span>
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
                  Refund policy only applies if order was cancelled within 12 hours
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Refund Details:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Full refund available only for cancellations within 12 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>20% order cancellation fee will be deducted from the total amount</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>This fee covers initial setup and design work costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>As a single-person startup, we need this protection to sustain our business</span>
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
                  Delivery is not free, as we ship internationally
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Shipping Information:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Shipping costs are calculated based on destination and package weight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>International shipping rates apply to all non-domestic orders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Shipping costs will be communicated before final payment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span>Delivery times vary by location (typically 2-4 weeks internationally)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-handwritten text-3xl text-foreground mb-4">
              Questions About Our Policies?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're here to help! Contact us on X (Twitter) for any questions or concerns.
            </p>
            <a
              href="https://x.com/whatsupskylar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Contact on X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
