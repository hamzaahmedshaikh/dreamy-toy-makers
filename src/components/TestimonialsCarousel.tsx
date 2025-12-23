import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "California, USA",
    rating: 5,
    text: "I couldn't believe how accurately they captured my OC! The details on her hair and outfit are incredible. Worth every penny!",
    character: "Custom OC - Magical Girl"
  },
  {
    id: 2,
    name: "Yuki T.",
    location: "Tokyo, Japan",
    rating: 5,
    text: "The quality is on par with official Nendoroids! I've ordered three custom toys so far and each one is perfect.",
    character: "Custom OC - Samurai"
  },
  {
    id: 3,
    name: "Alex K.",
    location: "London, UK",
    rating: 5,
    text: "Fast shipping and amazing communication throughout the process. My D&D character looks absolutely adorable as a chibi!",
    character: "Custom OC - Fantasy Elf"
  },
  {
    id: 4,
    name: "Maria G.",
    location: "Madrid, Spain",
    rating: 5,
    text: "Best birthday gift I ever bought for myself! The AI preview was spot-on and the final product exceeded my expectations.",
    character: "Custom OC - Cyberpunk"
  },
  {
    id: 5,
    name: "Chen W.",
    location: "Singapore",
    rating: 5,
    text: "Professional service and stunning quality. My Vtuber model looks amazing as a 3D figure!",
    character: "Custom OC - Vtuber"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
      {/* Quote decoration */}
      <Quote className="absolute top-4 left-4 w-12 h-12 text-primary/10" />
      
      {/* Content */}
      <div className="text-center max-w-2xl mx-auto">
        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(currentTestimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-accent fill-accent" />
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-lg text-foreground mb-6 leading-relaxed italic">
          "{currentTestimonial.text}"
        </p>

        {/* Author info */}
        <div className="mb-2">
          <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
          <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
        </div>
        
        {/* Character badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          {currentTestimonial.character}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/50 hover:bg-background flex items-center justify-center transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/50 hover:bg-background flex items-center justify-center transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
