import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SQRT_5000 = Math.sqrt(5000);

const testimonialsData = [
  {
    tempId: 0,
    testimonial: "Vishal's analytical insights reshaped how we track our core metrics. The ROI on his solutions is incredibly high.",
    by: "Sarah M. — VP of Operations",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 1,
    testimonial: "He seamlessly bridges the gap between raw data and strategic business value. A true analytical mastermind.",
    by: "David L. — Founder",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 2,
    testimonial: "It's rare to find someone who understands both the numbers and aesthetic presentation. Staggeringly good work.",
    by: "Amanda K. — CTO",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 3,
    testimonial: "The smartest decision we made was bringing Vishal on board. His dashboard systems are absolute game-changers.",
    by: "Michael R. — Director of Growth",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12. Vishal's logic and precision streamlined our entire quarter.",
    by: "Elena F. — Product Manager",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop"
  }
];

const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-6 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isCenter 
          ? "z-10 bg-cyan-950/80 border-cyan-400/50 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.15)]" 
          : "z-0 bg-[#0a0a0a] border-white/10 opacity-60 hover:opacity-100 hover:border-cyan-500/30"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(0 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 0 100%)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.1) * position}px)
          translateY(${isCenter ? -40 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 4 : -4}deg)
          scale(${isCenter ? 1 : 0.9})
        `
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-cyan-400" : "bg-white/20"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1
        }}
      />
      
      <div className="flex items-center justify-between mb-8">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by}
          className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-white/10"
        />
        <div className="flex gap-1 opacity-80">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className={cn("w-4 h-4", isCenter ? "text-cyan-400 fill-cyan-400" : "text-gray-600 fill-gray-600")} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
      </div>

      <h3 className={cn(
        "text-lg sm:text-xl font-serif italic leading-relaxed",
        isCenter ? "text-cyan-50" : "text-gray-400"
      )}>
        "{testimonial.testimonial}"
      </h3>

      <p className={cn(
        "absolute bottom-8 left-8 right-8 text-xs font-bold tracking-[0.2em] uppercase",
        isCenter ? "text-cyan-500" : "text-gray-600"
      )}>
        {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonialsData);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 380 : 300);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 4000);
    
    // Clear interval when unmounting or when user manually shifts the deck
    return () => clearInterval(interval);
  }, [testimonialsList]);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - Math.floor(testimonialsList.length / 2)
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-4 z-50">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-cyan-500 hover:border-cyan-400 hover:text-black transition-all shadow-lg pointer-events-auto"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-cyan-500 hover:border-cyan-400 hover:text-black transition-all shadow-lg pointer-events-auto"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
