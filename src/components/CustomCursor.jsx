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
    // Add event listener to window to handle dynamic elements (like the mobile menu)
    const handleMouseOver = (e) => {
      // Check if we are hovering over an interactive element or its children
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 24, // Center the 48px circle
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.5)",
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
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      scale: 1,
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
      x: position.x - 6, // Center the 12px dot
      y: position.y - 6,
      height: 12,
      width: 12,
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    hover: {
      x: position.x - 40, // Expands to 80px
      y: position.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent fill
    }
  };

  // Hide the default cursor when on desktop
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Add a single style block to ensure global cursor hiding
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center backdrop-blur-[1px]"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: "tween", duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
