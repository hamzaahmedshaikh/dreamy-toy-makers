import { Heart, MapPin, Star, Sparkles, Quote, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            The story behind Skylar's 3D Toys ✨
          </p>
        </div>

        {/* Main About Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-8 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-light to-rose flex items-center justify-center">
                <span className="font-handwritten text-5xl text-primary-foreground">S</span>
              </div>
              <Heart className="absolute -top-2 -right-2 w-8 h-8 text-primary fill-primary animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-2 w-6 h-6 text-accent animate-sparkle" />
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="font-handwritten text-4xl text-foreground mb-2">
                Hi, I'm Skylar! 💕
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  19 years old
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  Florida, USA
                </span>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="space-y-6 text-lg text-foreground leading-relaxed">
            <p>
              I'm a <strong>motivated creator</strong> with a "will do it anyhow" energy 
              that drives everything I do! 💪 When I set my mind to something, nothing can 
              stop me from making it happen.
            </p>
            
            <p>
              My passion for anime and 3D modeling came together when I started creating 
              custom toys of beloved characters. Each piece is crafted with love, attention 
              to detail, and the goal of bringing joy to fellow anime fans.
            </p>

            <div className="bg-primary/5 rounded-2xl p-6">
              <p className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold">About the Shop</span>
              </p>
              <p>
                Currently, this store is <strong>online-only</strong>, but I'm planning to 
                open a physical store soon! 🏪 Stay tuned for updates on X!
              </p>
            </div>
          </div>
        </div>

        {/* Favorite Character Section */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-8 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
          <div className="text-center mb-8">
            <h3 className="font-handwritten text-3xl text-foreground mb-2">
              My Favorite Character 🌸
            </h3>
            <p className="text-muted-foreground">The one who inspires me every day</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-rose-light/60 to-lavender/40 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-2" />
                  <span className="font-handwritten text-2xl text-foreground">Marin</span>
                </div>
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-sparkle" />
              <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-accent fill-accent" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h4 className="font-handwritten text-3xl text-foreground mb-2">
                Marin Kitagawa
              </h4>
              <p className="text-muted-foreground mb-4">From "My Dress-Up Darling"</p>
              
              {/* Quote */}
              <div className="bg-primary/5 rounded-2xl p-6 relative">
                <Quote className="absolute top-3 left-3 w-6 h-6 text-primary/30" />
                <blockquote className="text-foreground italic pl-6 text-lg">
                  "I think liking what you like is the most important thing!"
                </blockquote>
                <p className="text-muted-foreground text-sm mt-2 pl-6">— Marin Kitagawa</p>
              </div>
            </div>
          </div>
        </div>

        {/* My OC Sign-off */}
        <div className="glass-card rounded-3xl p-8 text-center animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cream to-sky flex items-center justify-center mx-auto mb-4 float-animation">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <p className="font-handwritten text-2xl text-foreground mb-2">
              Created with love by
            </p>
            <p className="font-handwritten text-4xl text-gradient">
              ✨ Skylar ✨
            </p>
          </div>

          <a
            href="https://x.com/whatsupskylar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="cute" size="lg">
              <Twitter className="w-4 h-4" />
              Follow me on X
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
