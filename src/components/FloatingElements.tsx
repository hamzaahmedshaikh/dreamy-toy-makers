import { Heart, Star, Sparkles, Cloud } from "lucide-react";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating hearts */}
      <Heart className="absolute top-20 left-[10%] w-6 h-6 text-rose-light/40 float-animation fill-rose-light/20" />
      <Heart className="absolute top-40 right-[15%] w-4 h-4 text-rose-light/30 float-animation-delay fill-rose-light/15" />
      <Heart className="absolute bottom-32 left-[20%] w-5 h-5 text-rose-light/35 float-animation fill-rose-light/20" />
      
      {/* Floating stars */}
      <Star className="absolute top-32 right-[25%] w-5 h-5 text-accent/50 float-animation-delay fill-accent/30" />
      <Star className="absolute top-60 left-[30%] w-4 h-4 text-accent/40 float-animation fill-accent/25" />
      <Star className="absolute bottom-48 right-[10%] w-6 h-6 text-accent/45 float-animation-delay fill-accent/25" />
      
      {/* Sparkles */}
      <Sparkles className="absolute top-48 left-[5%] w-4 h-4 text-primary/30 sparkle" />
      <Sparkles className="absolute top-24 right-[8%] w-5 h-5 text-primary/25 sparkle" style={{ animationDelay: "0.5s" }} />
      <Sparkles className="absolute bottom-24 left-[35%] w-4 h-4 text-primary/35 sparkle" style={{ animationDelay: "1s" }} />
      
      {/* Clouds */}
      <Cloud className="absolute top-36 right-[40%] w-12 h-12 text-sky/40 float-animation" />
      <Cloud className="absolute bottom-40 right-[30%] w-10 h-10 text-sky/30 float-animation-delay" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-light/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/20 rounded-full blur-3xl float-animation-delay" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/15 rounded-full blur-3xl float-animation" />
    </div>
  );
};

export default FloatingElements;
