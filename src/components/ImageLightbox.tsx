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
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-transparent border-none shadow-none">
        <VisuallyHidden>
          <DialogTitle>{name} from {anime}</DialogTitle>
        </VisuallyHidden>
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-cream/40 to-sky/20">
            <img
              src={image}
              alt={`${name} 3D toy figure`}
              className="w-full h-full object-cover"
            />
            {/* Sparkle decoration */}
            <Sparkles className="absolute top-4 left-4 w-6 h-6 text-primary animate-sparkle" />
          </div>

          {/* Character Info */}
          <div className="p-6 text-center">
            <h3 className="font-handwritten text-3xl text-foreground mb-1">
              {name}
            </h3>
            <p className="text-muted-foreground mb-4">
              {anime}
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Premium 3D Collectible</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
