import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Star, ArrowRight, Shield, Truck, Award, Wand2, Gift, Zap } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-slide-in-bottom animate-bounce-gentle">
            <Sparkles className="w-4 h-4 animate-sparkle" />
            <span className="text-sm font-medium">Handcrafted with Love</span>
            <Heart className="w-4 h-4 fill-primary animate-heartbeat" />
          </div>

          {/* Main Heading */}
          <h1 className="font-handwritten text-6xl sm:text-7xl md:text-8xl text-foreground mb-6 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
            Your Anime OC,
            <br />
            <span className="text-gradient animate-shimmer-text">Now a 3D Toy!</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in-bottom leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Transform your favorite Original Character into an adorable, 
            high-quality 3D printed collectible toy. Each piece is uniquely 
            crafted to capture every detail of your character!
          </p>

          {/* Price Tag */}
          <div className="inline-block glass-card rounded-2xl px-6 py-4 mb-8 animate-slide-in-bottom animate-pulse-soft hover:shadow-glow transition-all duration-300 hover:scale-105" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-accent fill-accent animate-twinkle" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Premium Collectible</p>
                <p className="text-3xl font-bold text-foreground">$489 <span className="text-base font-normal text-muted-foreground">USD</span></p>
              </div>
              <Star className="w-6 h-6 text-accent fill-accent animate-twinkle" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
            <Link to="/customize">
              <Button variant="hero" size="xl" className="group animate-bounce-gentle hover:animate-none">
                <Wand2 className="w-5 h-5 group-hover:animate-wiggle" />
                Place Your Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-slide-in-bottom" style={{ animationDelay: "0.5s" }}>
            {[
              { icon: Heart, text: "100% Handmade", fill: true },
              { icon: Star, text: "Premium Quality", fill: true },
              { icon: Sparkles, text: "Unique Design", fill: false },
            ].map((badge, i) => (
              <div 
                key={badge.text} 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-default"
              >
                <badge.icon className={`w-4 h-4 text-primary group-hover:animate-bounce-gentle ${badge.fill ? 'fill-primary' : ''}`} />
                <span className="text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Heart,
              title: "Upload Your OC",
              description: "Share your anime character design and I'll bring it to life",
              color: "primary",
            },
            {
              icon: Wand2,
              title: "Preview Your Toy",
              description: "See exactly how your character will look as a 3D toy before ordering",
              color: "accent",
            },
            {
              icon: Gift,
              title: "Receive Your Toy",
              description: "Get your adorable collectible delivered to your door",
              color: "primary",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 animate-slide-in-bottom hover:shadow-glow group"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary group-hover:animate-wiggle" />
              </div>
              <h3 className="font-handwritten text-2xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Me Section */}
        <div className="mb-16 animate-slide-in-bottom" style={{ animationDelay: "0.8s" }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary animate-sparkle" />
              <h2 className="font-handwritten text-4xl text-foreground">
                Why Collectors <span className="text-gradient">Choose Me</span>
              </h2>
              <Sparkles className="w-5 h-5 text-primary animate-sparkle" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Museum-Grade Quality",
                description: "Premium PVC material with hand-painted details that last a lifetime"
              },
              {
                icon: Shield,
                title: "Satisfaction Guaranteed",
                description: "Not happy with your toy? I'll remake it or refund you completely"
              },
              {
                icon: Truck,
                title: "Worldwide Shipping",
                description: "Insured shipping to 100+ countries with tracking included"
              }
            ].map((item, index) => (
              <div 
                key={item.title} 
                className="flex items-start gap-4 glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300 hover:scale-[1.02] group animate-fade-in-up"
                style={{ animationDelay: `${0.85 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:animate-bounce-gentle group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16 animate-slide-in-bottom" style={{ animationDelay: "0.85s" }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" />
              <h2 className="font-handwritten text-4xl text-foreground">
                What My <span className="text-gradient">Customers Say</span>
              </h2>
              <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
          <TestimonialsCarousel />
        </div>

        {/* Sample Preview CTA */}
        <div className="glass-card rounded-3xl p-8 text-center animate-slide-in-bottom hover:shadow-glow transition-all duration-500 group" style={{ animationDelay: "0.9s" }}>
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-accent fill-accent animate-twinkle" />
            <Star className="w-5 h-5 text-accent fill-accent animate-twinkle" style={{ animationDelay: "0.2s" }} />
            <Star className="w-6 h-6 text-accent fill-accent animate-twinkle" style={{ animationDelay: "0.4s" }} />
          </div>
          <h2 className="font-handwritten text-4xl text-foreground mb-4">
            Curious what I can create?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Check out my gallery of 64 anime character samples to see the quality 
            and style of my 3D toys!
          </p>
          <Link to="/samples">
            <Button variant="cute" size="lg" className="group/btn hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 group-hover/btn:animate-sparkle" />
              View Sample Gallery
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
