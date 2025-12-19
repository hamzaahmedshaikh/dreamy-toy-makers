import { Heart, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-3xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span className="font-handwritten text-2xl text-foreground">
              Skylar's 3D Toys
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Bringing your favorite anime characters to life as adorable 3D toys ✨
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors text-sm">
              Home
            </Link>
            <Link to="/customize" className="text-foreground hover:text-primary transition-colors text-sm">
              Customize
            </Link>
            <Link to="/samples" className="text-foreground hover:text-primary transition-colors text-sm">
              Samples
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors text-sm">
              About
            </Link>
          </div>
          
          <a
            href="https://x.com/whatsupskylar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-rose-dark transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-sm">@whatsupskylar</span>
          </a>
          
          <p className="text-muted-foreground text-xs mt-4">
            © 2024 Skylar's 3D Toys. Made with 💕 in Florida
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
