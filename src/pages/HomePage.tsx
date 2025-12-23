import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Star, ArrowRight, Shield, Truck, Award } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-slide-in-bottom">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Handcrafted with Love</span>
            <Heart className="w-4 h-4 fill-primary" />
          </div>

          {/* Main Heading */}
          <h1 className="font-handwritten text-6xl sm:text-7xl md:text-8xl text-foreground mb-6 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
            Your Anime OC,
            <br />
            <span className="text-gradient">Now a 3D Toy!</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in-bottom leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Transform your favorite Original Character into an adorable, 
            high-quality 3D printed collectible toy. Each piece is uniquely 
            crafted to capture every detail of your character!
          </p>

          {/* Price Tag */}
          <div className="inline-block glass-card rounded-2xl px-6 py-4 mb-8 animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-accent fill-accent" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Premium Collectible</p>
                <p className="text-3xl font-bold text-foreground">$489 <span className="text-base font-normal text-muted-foreground">USD</span></p>
              </div>
              <Star className="w-6 h-6 text-accent fill-accent" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
            <Link to="/customize">
              <Button variant="hero" size="xl" className="group">
                <Sparkles className="w-5 h-5 group-hover:animate-wiggle" />
                Place Your Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-slide-in-bottom" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm">100% Handmade</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">Unique Design</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Heart,
              title: "Upload Your OC",
              description: "Share your anime character design and I'll bring it to life",
            },
            {
              icon: Sparkles,
              title: "Preview Your Toy",
              description: "See exactly how your character will look as a 3D toy before ordering",
            },
            {
              icon: Star,
              title: "Receive Your Toy",
              description: "Get your adorable collectible delivered to your door",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-slide-in-bottom"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-handwritten text-2xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Me Section */}
        <div className="mb-16 animate-slide-in-bottom" style={{ animationDelay: "0.8s" }}>
          <h2 className="font-handwritten text-4xl text-foreground text-center mb-8">
            Why Collectors <span className="text-gradient">Choose Me</span>
          </h2>
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
              <div key={item.title} className="flex items-start gap-4 glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
          <h2 className="font-handwritten text-4xl text-foreground text-center mb-8">
            What My <span className="text-gradient">Customers Say</span>
          </h2>
          <TestimonialsCarousel />
        </div>

        {/* Sample Preview CTA */}
        <div className="glass-card rounded-3xl p-8 text-center animate-slide-in-bottom" style={{ animationDelay: "0.9s" }}>
          <h2 className="font-handwritten text-4xl text-foreground mb-4">
            Curious what I can create?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Check out my gallery of 64 anime character samples to see the quality 
            and style of my 3D toys!
          </p>
          <Link to="/samples">
            <Button variant="cute" size="lg">
              View Sample Gallery
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;