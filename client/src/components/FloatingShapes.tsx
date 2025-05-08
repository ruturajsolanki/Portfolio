import { useState, useEffect } from 'react';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  rotation: number;
  type: 'circle' | 'square' | 'triangle';
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  
  useEffect(() => {
    const colors = [
      'rgba(66, 135, 245, 0.2)',
      'rgba(245, 66, 129, 0.15)',
      'rgba(245, 185, 66, 0.15)',
      'rgba(66, 245, 173, 0.15)',
      'rgba(192, 66, 245, 0.15)'
    ];
    
    const types: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    
    // Generate random shapes
    const generatedShapes: Shape[] = [];
    
    for (let i = 0; i < 12; i++) {
      generatedShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 10,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    
    setShapes(generatedShapes);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => {
        const style = {
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          opacity: shape.opacity,
          backgroundColor: shape.type !== 'triangle' ? shape.color : 'transparent',
          transform: `rotate(${shape.rotation}deg)`,
          animationDuration: `${20 / shape.speed}s`,
          borderWidth: shape.type === 'triangle' ? `${shape.size / 2}px` : undefined,
          borderStyle: shape.type === 'triangle' ? 'solid' : undefined,
          borderColor: shape.type === 'triangle' ? 
            `transparent transparent ${shape.color} transparent` : undefined,
          borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '4px' : '0'
        };
        
        return (
          <div 
            key={shape.id} 
            className={`absolute animate-float z-0`}
            style={style}
          />
        );
      })}
    </div>
  );
}