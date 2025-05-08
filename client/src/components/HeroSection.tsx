import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingShapes from "./FloatingShapes";
import ScrollIndicator from "./ScrollIndicator";
import { useParallax } from "@/hooks/use-parallax";

export default function HeroSection() {
  // Apply dramatically enhanced parallax effects with different settings
  const { ref: titleRef, style: titleStyle } = useParallax({ 
    speed: 1.6, 
    direction: 'up',
    opacity: true,
    scale: true
  });

  const { ref: subtitleRef, style: subtitleStyle } = useParallax({ 
    speed: 1.2, 
    direction: 'down',
    scale: true,
    rotation: true
  });

  const { ref: ctaRef, style: ctaStyle } = useParallax({ 
    speed: 0.9, 
    direction: 'up',
    scale: true
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="hero" className="flex flex-col justify-center items-center relative min-h-[140vh] overflow-hidden py-32">
      <FloatingShapes />
      
      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            ref={subtitleRef} 
            style={subtitleStyle}
          >
            <motion.p 
              className="text-primary mb-2 text-xl" 
              variants={itemVariants}
            >
              Creative Frontend Developer
            </motion.p>
          </motion.div>
          
          <motion.div 
            ref={titleRef} 
            style={titleStyle}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6"
              variants={itemVariants}
            >
              Building digital<br />experiences that <span className="text-primary">matter</span>
            </motion.h1>
          </motion.div>
          
          <motion.div 
            ref={subtitleRef} 
            style={subtitleStyle}
          >
            <motion.p 
              className="text-lg opacity-80 mb-8 max-w-xl mx-auto"
              variants={itemVariants}
            >
              I craft clean, responsive web applications with a focus on user experience, performance, and beautiful interactions.
            </motion.p>
          </motion.div>
          
          <motion.div 
            ref={ctaRef}
            style={ctaStyle}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <MagneticButton asChild>
              <a href="#projects" className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                View My Work
              </a>
            </MagneticButton>
            
            <MagneticButton asChild>
              <a href="#contact" className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
                Get In Touch
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}
