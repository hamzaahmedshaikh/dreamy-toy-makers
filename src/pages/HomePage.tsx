import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Star, ArrowRight, Shield, Truck, Award, Wand2, Gift } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { useSoundEffect } from "@/hooks/useSoundEffect";

const HomePage = () => {
  const { playSound } = useSoundEffect();
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 watercolor-bg">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-6 sm:mb-8 text-sm">
            <Heart className="w-3.5 h-3.5 fill-primary" />
            <span className="font-medium">Handcrafted with Love</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-4 sm:mb-6 tracking-tight">
            Your Anime OC,
            <br />
            <span className="text-primary">Now a 3D Toy</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-6 sm:mb-8 px-4">
            Transform your Original Character into a beautiful 
            high-quality 3D printed collectible toy.
          </p>

          {/* Price Tag */}
          <div className="inline-block glass-card rounded-full px-5 py-3 sm:px-6 sm:py-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-muted-foreground">Starting at</span>
              <span className="text-xl sm:text-2xl font-semibold text-foreground">$1,250</span>
              <span className="text-xs sm:text-sm text-muted-foreground">USD</span>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Link to="/customize">
              <Button variant="hero" size="lg" className="group rounded-full px-6 sm:px-8" onClick={playSound}>
                <Wand2 className="w-4 h-4" />
                <span className="mx-1">Place Your Order</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            {[
              { icon: Heart, text: "Handmade" },
              { icon: Star, text: "Premium" },
              { icon: Sparkles, text: "Unique" },
            ].map((badge) => (
              <div 
                key={badge.text} 
                className="flex items-center gap-1.5 text-muted-foreground text-sm"
              >
                <badge.icon className="w-3.5 h-3.5 text-primary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 sm:mb-16">
          {[
            {
              icon: Heart,
              title: "Upload Your OC",
              description: "Share your character design",
            },
            {
              icon: Wand2,
              title: "Preview Your Toy",
              description: "See how it will look",
            },
            {
              icon: Gift,
              title: "Receive Your Toy",
              description: "Delivered to your door",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-5 sm:p-6 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Me Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl text-foreground">
              Why Collectors Choose Me
            </h2>
          </div>
          <div className="grid gap-3 sm:gap-4">
            {[
              {
                icon: Award,
                title: "Museum-Grade Quality",
                description: "Premium PVC with hand-painted details"
              },
              {
                icon: Shield,
                title: "Satisfaction Guaranteed",
                description: "Full refund if you're not happy"
              },
              {
                icon: Truck,
                title: "Worldwide Shipping",
                description: "Insured delivery to 100+ countries"
              }
            ].map((item) => (
              <div 
                key={item.title} 
                className="flex items-center gap-4 glass-card rounded-xl p-4 sm:p-5"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl text-foreground">
              What Customers Say
            </h2>
          </div>
          <TestimonialsCarousel />
        </div>

        {/* Sample Preview CTA */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl text-foreground mb-3">
            Curious what I can create?
          </h2>
          <p className="text-muted-foreground mb-5 text-sm sm:text-base max-w-md mx-auto">
            Check out my gallery of 64 anime character samples
          </p>
          <Link to="/samples">
            <Button variant="cute" size="default" className="rounded-full">
              <Sparkles className="w-4 h-4" />
              View Gallery
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;