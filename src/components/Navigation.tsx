import { Link, useLocation } from "react-router-dom";
import { Heart, Sparkles, Home, Image, User, FileText, Wand2 } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/customize", label: "Order", icon: Wand2 },
    { path: "/samples", label: "Gallery", icon: Image },
    { path: "/about", label: "About", icon: User },
    { path: "/policies", label: "Info", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 py-2 sm:px-4 sm:py-3">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary" />
            </div>
            <span className="font-handwritten text-xl sm:text-2xl text-foreground hidden md:block group-hover:text-primary transition-colors">
              Skylar's Toys
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-2 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                    transition-all duration-300 flex items-center gap-1 sm:gap-2
                    ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {isActive && (
                    <Sparkles className="w-2.5 h-2.5 absolute -top-0.5 -right-0.5 text-accent animate-sparkle hidden sm:block" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
