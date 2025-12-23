import { Heart, Twitter, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-3xl p-6 text-center hover:shadow-glow transition-all duration-500">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 text-accent fill-accent animate-twinkle" />
            <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" />
            <span className="font-handwritten text-2xl text-foreground">
              Skylar's 3D Toys
            </span>
            <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" style={{ animationDelay: "0.3s" }} />
            <Star className="w-4 h-4 text-accent fill-accent animate-twinkle" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Bringing your favorite anime characters to life as adorable 3D toys ✨
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            {[
              { path: "/", label: "Home" },
              { path: "/customize", label: "Customize" },
              { path: "/samples", label: "Samples" },
              { path: "/about", label: "About" },
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="text-foreground hover:text-primary transition-all duration-300 text-sm hover:scale-110"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <a
            href="https://x.com/whatsupskylar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-rose-dark transition-all duration-300 group hover:scale-105"
          >
            <Twitter className="w-4 h-4 group-hover:animate-bounce-gentle" />
            <span className="text-sm">@whatsupskylar</span>
            <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 animate-sparkle transition-opacity" />
          </a>
          
          <p className="text-muted-foreground text-xs mt-4 flex items-center justify-center gap-1">
            © 2024 Skylar's 3D Toys. Made with 
            <Heart className="w-3 h-3 text-primary fill-primary animate-heartbeat inline" /> 
            in Florida
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
