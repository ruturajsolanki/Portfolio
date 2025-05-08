import { motion } from "framer-motion";
import { Code, Clock, User } from "lucide-react";
import MagneticButton from "./MagneticButton";
import FloatingShapes from "./FloatingShapes";
import { useParallax } from "@/hooks/use-parallax";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

export default function AboutSection() {
  const { ref: contentRef, style: contentStyle } = useParallax({ 
    speed: 0.8, 
    direction: 'right',
    opacity: true
  });
  const { ref: imageRef, style: imageStyle } = useParallax({
    speed: 0.6,
    direction: 'left',
    scale: true
  });
  const { ref, inView } = useScrollTrigger();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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
  
  const bubbleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section id="about" className="flex items-center relative overflow-hidden min-h-[120vh] py-32">
      <FloatingShapes />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            ref={ref}
            animate={inView ? "visible" : "hidden"}
            initial="hidden"
            variants={containerVariants}
            className="order-2 md:order-1"
            style={contentStyle}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-display mb-6"
              variants={itemVariants}
            >
              About <span className="text-primary">Me</span>
            </motion.h2>
            
            <motion.p 
              className="mb-6 text-lg"
              variants={itemVariants}
            >
              I'm a passionate frontend developer with 5 years of experience creating engaging web experiences. I blend technical expertise with creative design thinking to build applications that are both functional and beautiful.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.div 
                className="fact-bubble p-4 bg-muted dark:bg-muted rounded-lg text-center hover:scale-105 transition-transform"
                variants={bubbleVariants}
                custom={0}
              >
                <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">50+ Projects</h3>
                <p className="text-sm opacity-70">Completed</p>
              </motion.div>
              
              <motion.div 
                className="fact-bubble p-4 bg-muted dark:bg-muted rounded-lg text-center hover:scale-105 transition-transform"
                variants={bubbleVariants}
                custom={1}
              >
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">5+ Years</h3>
                <p className="text-sm opacity-70">Experience</p>
              </motion.div>
              
              <motion.div 
                className="fact-bubble p-4 bg-muted dark:bg-muted rounded-lg text-center hover:scale-105 transition-transform"
                variants={bubbleVariants}
                custom={2}
              >
                <User className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">30+ Clients</h3>
                <p className="text-sm opacity-70">Worldwide</p>
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <MagneticButton asChild>
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  <span>Let's Talk</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>
          
          <div 
            className="flex justify-center items-center order-1 md:order-2"
            ref={imageRef}
            style={imageStyle}
          >
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-70 dark:opacity-40"></div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1028&q=80" 
                alt="Jane Doe" 
                className="w-64 h-64 object-cover rounded-full border-4 border-white dark:border-[#1a1a1a] shadow-lg relative z-10"
              />
              <motion.div 
                className="absolute -bottom-3 right-6 bg-white dark:bg-[#1a1a1a] p-3 rounded-full shadow-lg z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Code className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
