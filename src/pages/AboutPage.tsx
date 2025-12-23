import { useEffect, useRef, useState } from "react";
import { Heart, MapPin, Star, Sparkles, Quote, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "@/hooks/useSoundEffect";

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { playSound } = useSoundEffect();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxY = scrollY * 0.3;
  const rotateX = Math.min(scrollY * 0.02, 15);
  const rotateY = Math.sin(scrollY * 0.005) * 10;

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-8 px-4 watercolor-bg overflow-hidden">
      <div className="max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
        
        {/* Floating 3D Character Model Section */}
        <div 
          className="relative mb-16"
          style={{
            transform: `translateY(${-parallaxY * 0.5}px)`,
          }}
        >
          {/* 3D Rotating OC Character */}
          <div className="flex justify-center mb-8">
            <div 
              className="relative"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Main OC Image with 3D effect */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-primary/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_100px_hsl(340_65%_65%/0.3)]">
                <img
                  src="https://i.ibb.co/DDWvThgV/oc.jpg"
                  alt="Skylar's OC Character"
                  className="w-full h-full object-cover"
                />
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating decorative elements in 3D space */}
              <div 
                className="absolute -top-8 -right-4 animate-float"
                style={{ transform: 'translateZ(60px)' }}
              >
                <Heart className="w-12 h-12 text-primary fill-primary drop-shadow-lg" />
              </div>
              <div 
                className="absolute -bottom-4 -left-8 animate-float-delayed"
                style={{ transform: 'translateZ(40px)' }}
              >
                <Sparkles className="w-10 h-10 text-accent drop-shadow-lg" />
              </div>
              <div 
                className="absolute top-4 -left-12 animate-sparkle"
                style={{ transform: 'translateZ(30px)' }}
              >
                <Star className="w-8 h-8 text-accent fill-accent drop-shadow-lg" />
              </div>
              <div 
                className="absolute -bottom-8 right-4 animate-twinkle"
                style={{ transform: 'translateZ(50px)' }}
              >
                <Star className="w-6 h-6 text-primary fill-primary drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center">
            <h1 className="font-handwritten text-6xl sm:text-7xl text-foreground mb-4">
              Hi, I'm <span className="text-gradient">Skylar!</span> 💕
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-lg">
              <span className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-accent fill-accent" />
                19 years old
              </span>
              <span className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-primary" />
                Florida, USA
              </span>
            </div>
          </div>
        </div>

        {/* Story Section with Parallax */}
        <div 
          className="glass-card rounded-3xl p-8 sm:p-12 mb-8"
          style={{
            transform: `translateY(${-parallaxY * 0.2}px) rotateX(${rotateX * 0.3}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative">
            <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-primary animate-sparkle" />
            <h2 className="font-handwritten text-4xl text-foreground mb-6 text-center">
              My Story ✨
            </h2>
          </div>
          
          <div className="space-y-6 text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
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

        {/* Favorite Character Section with 3D depth */}
        <div 
          className="glass-card rounded-3xl p-8 sm:p-12 mb-8"
          style={{
            transform: `translateY(${-parallaxY * 0.1}px) rotateX(${rotateX * 0.2}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="text-center mb-8">
            <h3 className="font-handwritten text-4xl text-foreground mb-2">
              My Favorite Character 🌸
            </h3>
            <p className="text-muted-foreground">The one who inspires me every day</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
            <div 
              className="relative flex-shrink-0"
              style={{
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-rose-light/60 to-lavender/40 flex items-center justify-center overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                <div className="text-center">
                  <Heart className="w-20 h-20 text-primary fill-primary mx-auto mb-2 animate-heartbeat" />
                  <span className="font-handwritten text-3xl text-foreground">Marin</span>
                </div>
              </div>
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent animate-sparkle" />
              <Star className="absolute -bottom-4 -left-4 w-8 h-8 text-accent fill-accent animate-twinkle" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h4 className="font-handwritten text-4xl text-foreground mb-2">
                Marin Kitagawa
              </h4>
              <p className="text-muted-foreground mb-6 text-lg">From "My Dress-Up Darling"</p>
              
              {/* Quote with depth */}
              <div 
                className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 relative"
                style={{ transform: 'translateZ(10px)' }}
              >
                <Quote className="absolute top-3 left-3 w-8 h-8 text-primary/30" />
                <blockquote className="text-foreground italic pl-8 text-xl font-medium">
                  "I think liking what you like is the most important thing!"
                </blockquote>
                <p className="text-muted-foreground text-sm mt-3 pl-8">— Marin Kitagawa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign-off with Follow Button */}
        <div 
          className="glass-card rounded-3xl p-8 sm:p-12 text-center"
          style={{
            transform: `rotateX(${rotateX * 0.1}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="mb-8">
            <div 
              className="w-28 h-28 rounded-full bg-gradient-to-br from-cream to-sky flex items-center justify-center mx-auto mb-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] animate-float"
              style={{ transform: 'translateZ(40px)' }}
            >
              <Sparkles className="w-14 h-14 text-primary animate-sparkle" />
            </div>
            <p className="font-handwritten text-2xl text-muted-foreground mb-2">
              Created with love by
            </p>
            <p className="font-handwritten text-5xl text-gradient">
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
              className="text-lg px-8 hover:scale-110 transition-transform"
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
