import { Heart, MapPin, Star, Sparkles, Quote, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "@/hooks/useSoundEffect";

const AboutPage = () => {
  const { playSound } = useSoundEffect();

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Section */}
        <div className="text-center mb-12">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto mb-6">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <img
                src="https://i.ibb.co/DDWvThgV/oc.jpg"
                alt="Skylar's OC Character"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <Heart className="absolute -top-2 -right-2 w-8 h-8 text-primary fill-primary" />
            <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-accent" />
          </div>
          
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-3">
            Hi, I'm <span className="text-gradient">Skylar!</span> 💕
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm">
              <Star className="w-4 h-4 text-accent fill-accent" />
              19 years old
            </span>
            <span className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              Florida, USA
            </span>
          </div>
        </div>

        {/* Story Section */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-8">
          <div className="relative">
            <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-primary" />
            <h2 className="font-handwritten text-4xl text-foreground mb-6 text-center">
              My Story ✨
            </h2>
          </div>
          
          <div className="space-y-5 text-lg text-foreground leading-relaxed">
            <p className="text-center">
              I'm a <strong className="text-primary">motivated creator</strong> with a "will do it anyhow" energy 
              that drives everything I do! 💪 When I set my mind to something, nothing can 
              stop me from making it happen.
            </p>
            
            <p className="text-center">
              My passion for anime and 3D modeling came together when I started creating 
              custom toys of beloved characters. Each piece is crafted with love, attention 
              to detail, and the goal of bringing joy to fellow anime fans.
            </p>

            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 text-center">
              <p className="flex items-center justify-center gap-2 text-primary mb-3">
                <MapPin className="w-5 h-5" />
                <span className="font-handwritten text-2xl">About the Shop</span>
              </p>
              <p>
                Currently, this store is <strong>online-only</strong>, but I'm planning to 
                open a physical store soon! 🏪 Stay tuned for updates on X!
              </p>
            </div>
          </div>
        </div>

        {/* Favorite Character Section */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-8">
          <div className="text-center mb-8">
            <h3 className="font-handwritten text-4xl text-foreground mb-2">
              My Favorite Character 🌸
            </h3>
            <p className="text-muted-foreground">The one who inspires me every day</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
            <div className="relative flex-shrink-0">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-rose-light/60 to-lavender/40 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-2" />
                  <span className="font-handwritten text-2xl text-foreground">Marin</span>
                </div>
              </div>
              <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-accent" />
              <Star className="absolute -bottom-3 -left-3 w-6 h-6 text-accent fill-accent" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h4 className="font-handwritten text-3xl text-foreground mb-2">
                Marin Kitagawa
              </h4>
              <p className="text-muted-foreground mb-4 text-lg">From "My Dress-Up Darling"</p>
              
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-5 relative">
                <Quote className="absolute top-2 left-2 w-6 h-6 text-primary/30" />
                <blockquote className="text-foreground italic pl-6 text-lg">
                  "I think liking what you like is the most important thing!"
                </blockquote>
                <p className="text-muted-foreground text-sm mt-2 pl-6">— Marin Kitagawa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign-off */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cream to-sky flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <p className="font-handwritten text-xl text-muted-foreground mb-1">
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
            <Button 
              variant="cute" 
              size="lg" 
              className="text-lg px-8"
              onClick={playSound}
            >
              <Twitter className="w-5 h-5" />
              Follow me on X
              <Heart className="w-5 h-5 fill-current" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
