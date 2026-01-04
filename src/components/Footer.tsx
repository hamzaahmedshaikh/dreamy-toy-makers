import { Heart, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-base font-medium text-foreground">
                Skylar's Toys
              </span>
            </div>
            
            {/* Nav Links */}
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              {[
                { path: "/", label: "Home" },
                { path: "/customize", label: "Order" },
                { path: "/samples", label: "Gallery" },
                { path: "/about", label: "About" },
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Social */}
            <a
              href="https://x.com/whatsupskylar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Twitter className="w-4 h-4" />
              <span>@whatsupskylar</span>
            </a>
          </div>
          
          <div className="border-t border-border mt-4 pt-4 text-center">
            <p className="text-muted-foreground text-xs">
              © 2024 Skylar's Toys · Made with <Heart className="w-3 h-3 text-primary fill-primary inline" /> in Florida
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
