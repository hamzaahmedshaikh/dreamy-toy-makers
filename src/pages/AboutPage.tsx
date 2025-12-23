import { useEffect, useRef, useState } from "react";
import { Heart, MapPin, Star, Sparkles, Quote, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "@/hooks/useSoundEffect";

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { playSound } = useSoundEffect();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D rotation based on scroll - toy rotates as you scroll
  const rotateY = scrollProgress * 360; // Full rotation as you scroll
  const rotateX = Math.sin(scrollProgress * Math.PI * 2) * 15;
  const translateZ = Math.sin(scrollProgress * Math.PI) * 50;
  const floatY = Math.sin(scrollProgress * Math.PI * 4) * 20;

  return (
    <div ref={containerRef} className="min-h-[200vh] pt-24 pb-8 px-4 watercolor-bg overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Sticky 3D Character that rotates with scroll */}
        <div className="sticky top-24 z-10 mb-16">
          <div className="flex justify-center" style={{ perspective: '1200px' }}>
            <div 
              className="relative will-change-transform"
              style={{
                transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px) translateY(${floatY}px)`,
                transformStyle: 'preserve-3d',
                transition: 'none',
              }}
            >
              {/* Main OC Image with 3D effect */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-8 border-primary/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_100px_hsl(340_65%_65%/0.3)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src="https://i.ibb.co/DDWvThgV/oc.jpg"
                  alt="Skylar's OC Character"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating decorative elements in 3D space */}
              <div 
                className="absolute -top-8 -right-4"
                style={{ transform: 'translateZ(60px)' }}
              >
                <Heart className="w-10 h-10 text-primary fill-primary drop-shadow-lg" />
              </div>
              <div 
                className="absolute -bottom-4 -left-8"
                style={{ transform: 'translateZ(40px)' }}
              >
                <Sparkles className="w-8 h-8 text-accent drop-shadow-lg" />
              </div>
              <div 
                className="absolute top-4 -left-12"
                style={{ transform: 'translateZ(30px)' }}
              >
                <Star className="w-6 h-6 text-accent fill-accent drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Name & Title - also sticky */}
          <div className="text-center mt-6">
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
        </div>

        {/* Content sections with scroll reveal */}
        <div className="relative z-0 mt-[50vh]">
          {/* Story Section */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 mb-8">
            <div className="relative">
              <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-primary" />
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

          {/* Favorite Character Section */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 mb-8">
            <div className="text-center mb-8">
              <h3 className="font-handwritten text-4xl text-foreground mb-2">
                My Favorite Character 🌸
              </h3>
              <p className="text-muted-foreground">The one who inspires me every day</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
              <div className="relative flex-shrink-0">
                <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-rose-light/60 to-lavender/40 flex items-center justify-center overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                  <div className="text-center">
                    <Heart className="w-20 h-20 text-primary fill-primary mx-auto mb-2" />
                    <span className="font-handwritten text-3xl text-foreground">Marin</span>
                  </div>
                </div>
                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent" />
                <Star className="absolute -bottom-4 -left-4 w-8 h-8 text-accent fill-accent" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="font-handwritten text-4xl text-foreground mb-2">
                  Marin Kitagawa
                </h4>
                <p className="text-muted-foreground mb-6 text-lg">From "My Dress-Up Darling"</p>
                
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 relative">
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
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
            <div className="mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cream to-sky flex items-center justify-center mx-auto mb-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]">
                <Sparkles className="w-14 h-14 text-primary" />
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
    </div>
  );
};

export default AboutPage;