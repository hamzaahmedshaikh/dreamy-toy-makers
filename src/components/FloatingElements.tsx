import { Heart, Star, Sparkles, Cloud, Moon, Sun, Flower2, Cherry } from "lucide-react";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating hearts - more of them! */}
      <Heart className="absolute top-20 left-[10%] w-6 h-6 text-rose-light/40 animate-float fill-rose-light/20" />
      <Heart className="absolute top-40 right-[15%] w-4 h-4 text-rose-light/30 animate-float-delayed fill-rose-light/15" />
      <Heart className="absolute bottom-32 left-[20%] w-5 h-5 text-rose-light/35 animate-float fill-rose-light/20" />
      <Heart className="absolute top-1/3 left-[5%] w-4 h-4 text-primary/25 animate-heartbeat fill-primary/15" />
      <Heart className="absolute top-2/3 right-[8%] w-5 h-5 text-rose-light/30 animate-float fill-rose-light/20" style={{ animationDelay: "-1s" }} />
      <Heart className="absolute top-[45%] left-[45%] w-3 h-3 text-primary/20 animate-heartbeat fill-primary/10" style={{ animationDelay: "-0.5s" }} />
      
      {/* Floating stars - scattered everywhere */}
      <Star className="absolute top-32 right-[25%] w-5 h-5 text-accent/50 animate-float-delayed fill-accent/30" />
      <Star className="absolute top-60 left-[30%] w-4 h-4 text-accent/40 animate-float fill-accent/25" />
      <Star className="absolute bottom-48 right-[10%] w-6 h-6 text-accent/45 animate-twinkle fill-accent/25" />
      <Star className="absolute top-1/4 right-[35%] w-3 h-3 text-accent/35 animate-twinkle fill-accent/20" style={{ animationDelay: "-1.5s" }} />
      <Star className="absolute bottom-1/4 left-[12%] w-5 h-5 text-accent/40 animate-float-delayed fill-accent/25" style={{ animationDelay: "-2s" }} />
      <Star className="absolute top-[55%] right-[45%] w-4 h-4 text-accent/30 animate-twinkle fill-accent/15" style={{ animationDelay: "-0.8s" }} />
      
      {/* Sparkles - magical effect */}
      <Sparkles className="absolute top-48 left-[5%] w-4 h-4 text-primary/30 animate-sparkle" />
      <Sparkles className="absolute top-24 right-[8%] w-5 h-5 text-primary/25 animate-sparkle" style={{ animationDelay: "0.5s" }} />
      <Sparkles className="absolute bottom-24 left-[35%] w-4 h-4 text-primary/35 animate-sparkle" style={{ animationDelay: "1s" }} />
      <Sparkles className="absolute top-[40%] right-[20%] w-6 h-6 text-primary/20 animate-sparkle" style={{ animationDelay: "0.3s" }} />
      <Sparkles className="absolute bottom-[35%] right-[30%] w-5 h-5 text-primary/25 animate-sparkle" style={{ animationDelay: "0.7s" }} />
      <Sparkles className="absolute top-[70%] left-[8%] w-4 h-4 text-primary/30 animate-sparkle" style={{ animationDelay: "1.2s" }} />
      
      {/* Clouds - soft and fluffy */}
      <Cloud className="absolute top-36 right-[40%] w-12 h-12 text-sky/40 animate-float" />
      <Cloud className="absolute bottom-40 right-[30%] w-10 h-10 text-sky/30 animate-float-delayed" />
      <Cloud className="absolute top-[20%] left-[60%] w-8 h-8 text-sky/25 animate-float" style={{ animationDelay: "-3s" }} />
      <Cloud className="absolute bottom-[60%] left-[25%] w-14 h-14 text-sky/20 animate-float-delayed" style={{ animationDelay: "-1.5s" }} />
      
      {/* Flowers - cute kawaii touch */}
      <Flower2 className="absolute top-[15%] left-[70%] w-5 h-5 text-rose-light/30 animate-wiggle-slow" />
      <Flower2 className="absolute bottom-[20%] right-[60%] w-4 h-4 text-lavender/40 animate-wiggle-slow" style={{ animationDelay: "-1s" }} />
      <Flower2 className="absolute top-[60%] left-[3%] w-6 h-6 text-rose-light/25 animate-wiggle-slow" style={{ animationDelay: "-2s" }} />
      
      {/* Cherry blossoms - Japanese aesthetic */}
      <Cherry className="absolute top-[30%] right-[5%] w-4 h-4 text-rose-light/35 animate-swing" />
      <Cherry className="absolute bottom-[45%] left-[15%] w-5 h-5 text-rose-light/30 animate-swing" style={{ animationDelay: "-0.5s" }} />
      <Cherry className="absolute top-[75%] right-[25%] w-4 h-4 text-rose-light/25 animate-swing" style={{ animationDelay: "-1s" }} />
      
      {/* Gradient orbs - magical glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-light/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-float" />
      <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-lavender/20 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-[15%] left-[5%] w-40 h-40 bg-mint/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
      <div className="absolute top-[65%] right-[50%] w-24 h-24 bg-rose-light/15 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: "-1s" }} />
      
      {/* Floating dots - particle effect */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
          style={{
            top: `${10 + (i * 6)}%`,
            left: `${5 + (i * 6.5)}%`,
            animationDelay: `${i * -0.4}s`,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        />
      ))}
      
      {/* More floating dots on the right */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`right-${i}`}
          className="absolute w-1.5 h-1.5 bg-accent/25 rounded-full animate-twinkle"
          style={{
            top: `${15 + (i * 8)}%`,
            right: `${8 + (i * 4)}%`,
            animationDelay: `${i * -0.3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
