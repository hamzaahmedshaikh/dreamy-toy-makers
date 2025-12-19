import { Link, useLocation } from "react-router-dom";
import { Heart, Sparkles, Home, Image, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/customize", label: "Customize", icon: Sparkles },
    { path: "/samples", label: "Samples", icon: Image },
    { path: "/about", label: "About", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-3xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
            </div>
            <span className="font-handwritten text-2xl text-foreground hidden sm:block">
              Skylar's Toys
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-3 sm:px-5 py-2 rounded-2xl font-medium text-sm
                    transition-all duration-300 flex items-center gap-2
                    ${isActive 
                      ? "bg-primary text-primary-foreground shadow-soft" 
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {isActive && (
                    <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-accent animate-sparkle" />
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
