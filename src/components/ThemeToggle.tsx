import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300"
      >
        <Sun className="w-5 h-5 text-primary" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 hover:scale-110 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-primary animate-pop-in" />
      ) : (
        <Moon className="w-5 h-5 text-primary animate-pop-in" />
      )}
    </Button>
  );
};

export default ThemeToggle;
