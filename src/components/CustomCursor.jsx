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
      x: position.x - 16, // Center the 32px circle
      y: position.y - 16,
      backgroundColor: "rgba(37, 99, 235, 0.1)", // blue-600 with low opacity
      border: "1px solid rgba(37, 99, 235, 0.3)",
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 35,
      }
    },
    hover: {
      x: position.x - 24, // Center the 48px circle
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(37, 99, 235, 0.05)",
      border: "1px solid rgba(37, 99, 235, 0.5)",
      scale: 1.2, // Slightly larger on hover
      mixBlendMode: "multiply",
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
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] hidden md:block"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-600 rounded-full pointer-events-none z-[100] hidden md:block"
        variants={dotVariants}
        animate="default"
        // Ensure the dot follows instantly without spring physics for precise pointing
        transition={{ type: "tween", duration: 0 }}
      />
    </>
  );
};

export default CustomCursor;
