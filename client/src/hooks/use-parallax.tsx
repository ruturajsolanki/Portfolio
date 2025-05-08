import { useRef, useEffect, useState, CSSProperties } from "react";

export type ParallaxDirection = 'up' | 'down' | 'left' | 'right';
export type ParallaxOptions = {
  speed?: number;
  direction?: ParallaxDirection;
  scale?: boolean;
  rotation?: boolean;
  opacity?: boolean;
};

export function useParallax(options: ParallaxOptions = {}) {
  const { 
    speed = 0.5,
    direction = 'up',
    scale = false,
    rotation = false,
    opacity = false 
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const elementOffsetTop = rect.top + scrollY;
      const elementHeight = rect.height;
      
      // Calculate how far the element is from the viewport center
      const distanceFromCenter = (elementOffsetTop + elementHeight / 2) - (scrollY + windowHeight / 2);
      
      // Normalize the distance from -1 to 1 based on the window height
      const normalizedDistance = distanceFromCenter / (windowHeight / 1.5);
      
      // Apply different transformations based on options
      const transforms: string[] = [];
      const multiplier = speed * 12; // Dramatically increased multiplier for very obvious effect
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Parallax translation based on direction
        if (direction === 'up' || direction === 'down') {
          const translationY = direction === 'up' ? normalizedDistance * multiplier * 30 : -normalizedDistance * multiplier * 30;
          transforms.push(`translateY(${translationY}px)`);
        } else {
          const translationX = direction === 'left' ? normalizedDistance * multiplier * 30 : -normalizedDistance * multiplier * 30;
          transforms.push(`translateX(${translationX}px)`);
        }
        
        // Optional scale effect
        if (scale) {
          const scaleValue = 1 + Math.abs(normalizedDistance) * 0.25 * speed;
          transforms.push(`scale(${scaleValue})`);
        }
        
        // Optional rotation effect
        if (rotation) {
          const rotationValue = normalizedDistance * 15 * speed;
          transforms.push(`rotate(${rotationValue}deg)`);
        }
        
        // Combine transformations
        const transform = transforms.join(' ');
        
        // Apply styles
        const styles: CSSProperties = { transform };
        
        // Optional opacity effect
        if (opacity) {
          const opacityValue = Math.max(0, Math.min(1, 1 - Math.abs(normalizedDistance) * speed * 0.5));
          styles.opacity = opacityValue;
        }
        
        // Apply transition for smoother effect when scrolling fast
        styles.transition = 'transform 0.1s ease-out';
        
        setStyle(styles);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction, scale, rotation, opacity]);

  return { ref, style };
}

// Simplified version for backward compatibility
export function useSimpleParallax(speed = 0.5) {
  return useParallax({ speed, direction: 'up' });
}
