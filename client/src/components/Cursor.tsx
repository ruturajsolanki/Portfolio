import { useMousePosition } from "@/hooks/use-mouse-position";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() => {
    // Update cursor state when hovering over magnetic buttons
    const handleMouseEnter = () => setCursorVariant("magnetic");
    const handleMouseLeave = () => setCursorVariant("default");
    
    const buttons = document.querySelectorAll('.magnetic-button');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Cursor dot variants
  const dotVariants = {
    default: {
      height: 8,
      width: 8,
      x: x - 4,
      y: y - 4,
    },
    magnetic: {
      height: 12,
      width: 12,
      x: x - 6,
      y: y - 6,
    }
  };
  
  // Cursor outline variants
  const outlineVariants = {
    default: {
      height: 40,
      width: 40,
      x: x - 20,
      y: y - 20,
      transition: {
        type: "spring",
        mass: 0.6,
        damping: 20
      }
    },
    magnetic: {
      height: 60,
      width: 60,
      x: x - 30,
      y: y - 30,
      borderColor: "rgba(0, 112, 243, 0.8)",
      transition: {
        type: "spring",
        mass: 0.6,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed rounded-full bg-primary z-[9999] pointer-events-none"
        variants={dotVariants}
        animate={cursorVariant}
      />
      <motion.div
        className="fixed rounded-full border-2 border-primary/50 z-[9998] pointer-events-none"
        variants={outlineVariants}
        animate={cursorVariant}
      />
    </>
  );
}
