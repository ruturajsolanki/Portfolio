import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Slot } from "@radix-ui/react-slot";

interface MagneticButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export default function MagneticButton({ children, asChild = false }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for x and y
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring for smoother movement
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Reset position when not hovering
  useEffect(() => {
    if (!isHovering) {
      x.set(0);
      y.set(0);
    }
  }, [isHovering, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    // Calculate center point of button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Apply a magnetic effect
    const magneticPull = 0.2; // Adjust this value for stronger/weaker effect
    x.set(distanceX * magneticPull);
    y.set(distanceY * magneticPull);
  };

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={buttonRef}
      className="magnetic-button inline-block"
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </Component>
  );
}
