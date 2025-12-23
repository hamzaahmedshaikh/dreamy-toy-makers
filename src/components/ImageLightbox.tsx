import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Sparkles } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  name: string;
  anime: string;
}

const ImageLightbox = ({ isOpen, onClose, image, name, anime }: ImageLightboxProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none">
        <VisuallyHidden>
          <DialogTitle>{name} from {anime}</DialogTitle>
        </VisuallyHidden>
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-cream/40 to-sky/20">
            <img
              src={image}
              alt={`${name} 3D toy figure`}
              className="w-full h-full object-contain"
            />
            {/* Sparkle decoration */}
            <Sparkles className="absolute top-3 left-3 w-5 h-5 text-primary animate-sparkle" />
          </div>

          {/* Character Info */}
          <div className="p-4 text-center">
            <h3 className="font-handwritten text-2xl text-foreground mb-1">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              {anime}
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs font-medium">Premium 3D Collectible</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
