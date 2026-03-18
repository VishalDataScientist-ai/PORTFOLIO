import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    // Add event listeners to all interactive elements to change cursor state
    const handleMouseOver = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Note: In a fully dynamic app, you might need observed mutations or re-runs

  const variants = {
    default: {
      x: position.x - 24, // Center the 48px circle
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "transparent",
      border: "2px solid rgba(255, 255, 255, 0.4)",
      mixBlendMode: "difference",
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 35,
      }
    },
    hover: {
      x: position.x - 40, // Center the 80px circle
      y: position.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "2px solid rgba(255, 255, 255, 1)",
      mixBlendMode: "difference",
      scale: 1, // Let width/height handle the size
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 35,
      }
    }
  };

  // Center dot that closely follows cursor
  const dotVariants = {
    default: {
      x: position.x - 4, // Center the 8px dot
      y: position.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference",
    },
    hover: {
      x: position.x - 0, 
      y: position.y - 0,
      height: 0,
      width: 0,
      opacity: 0
    }
  };

  // Hide the default cursor when on desktop
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Safety check - re-enable default cursor for interactive elements just in case,
    // though global 'none' usually overrides. Better to apply 'none' globally 
    // and let the custom cursor do the work.
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.style.cursor = 'none';
    });
    
    return () => {
      document.body.style.cursor = 'auto';
      interactiveElements.forEach(el => {
        el.style.cursor = 'pointer';
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block"
        variants={dotVariants}
        animate={cursorVariant}
        // Ensure the dot follows instantly without spring physics for precise pointing
        transition={{ type: "tween", duration: 0 }}
      />
    </>
  );
};

export default CustomCursor;
