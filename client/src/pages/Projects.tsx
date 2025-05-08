import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { projects } from "@/lib/data";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";
import MagneticButton from "@/components/MagneticButton";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projectsSectionRef = useRef(null);
  const headerSectionRef = useRef(null);
  const projectsGridRef = useRef(null);
  
  // Set up inView states for animation triggering
  const inView = useInView(projectsSectionRef, { once: false });
  const headerInView = useInView(headerSectionRef, { once: false });
  const projectsGridInView = useInView(projectsGridRef, { once: false });
  
  // Setup parallax for header and projects container
  const { ref: headerRef, style: headerStyle } = useParallax({ 
    speed: 0.5, 
    direction: 'up'
  });
  
  const { ref: projectsRef, style: projectsStyle } = useParallax({ 
    speed: 0.3, 
    direction: 'up'
  });
  
  // Background parallax effects
  const { ref: bgRef, style: bgStyle } = useParallax({
    speed: 0.1,
    direction: 'down'
  });
  
  const { ref: gridPatternRef, style: gridPatternStyle } = useParallax({
    speed: 0.05,
    direction: 'left'
  });
  
  // Array of parallax refs and styles for each project card with subtle effects
  const projectParallax = projects.map((_, index) => {
    const direction = index % 3 === 0 ? 'up' : (index % 3 === 1 ? 'right' : 'left');
    return useParallax({
      speed: 0.4 + (index * 0.1), // Subtle speed
      direction: direction as 'up' | 'right' | 'left',
      scale: index % 2 === 0
    });
  });
  
  const openProjectDetails = (projectId: number) => {
    setSelectedProject(projectId);
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };
  
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

  return (
    <div className="font-sans bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-500">
      <Navbar />
      
      <main>
        <section ref={projectsSectionRef} className="py-24 relative bg-gradient-to-b from-background to-background/95">
          <div ref={bgRef} style={bgStyle} className="absolute inset-0 bg-gradient-to-b from-background to-background/95 z-0"></div>
          <div ref={gridPatternRef} style={gridPatternStyle} className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center mb-16"
              ref={(el) => {
                // Assign to both refs
                if (el) {
                  // @ts-ignore - This is fine for DOM refs
                  headerRef.current = el;
                  // @ts-ignore
                  headerSectionRef.current = el;
                }
              }}
              style={headerStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                My <span className="text-primary">Projects</span>
              </h1>
              <p className="max-w-2xl mx-auto opacity-80 text-lg">
                A curated collection of my work across web applications, interactive experiences, and creative coding projects.
              </p>
            </motion.div>
            
            <motion.div 
              ref={(el) => {
                // Assign to both refs
                if (el) {
                  // @ts-ignore - This is fine for DOM refs
                  projectsRef.current = el;
                  // @ts-ignore
                  projectsGridRef.current = el;
                }
              }}
              style={projectsStyle}
              animate={inView ? "visible" : "hidden"}
              initial="hidden"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  ref={projectParallax[index].ref}
                  style={projectParallax[index].style}
                  className="bg-white dark:bg-[#161616] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-5 text-white">
                        <h3 className="font-bold text-xl">{project.title}</h3>
                        <p className="text-sm opacity-90">{project.tags.slice(0, 3).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="mb-5">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <button 
                        className="text-primary flex items-center font-medium hover:underline"
                        onClick={() => openProjectDetails(project.id)}
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                      <div className="flex space-x-3">
                        <a 
                          href={project.repo} 
                          className="w-9 h-9 rounded-full bg-muted dark:bg-muted/30 flex items-center justify-center hover:bg-primary/10 transition-colors" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a 
                          href={project.demo} 
                          className="w-9 h-9 rounded-full bg-muted dark:bg-muted/30 flex items-center justify-center hover:bg-primary/10 transition-colors" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {selectedProject !== null && (
        <ProjectModal 
          project={projects.find(p => p.id === selectedProject)!} 
          onClose={closeProjectDetails} 
        />
      )}
    </div>
  );
}