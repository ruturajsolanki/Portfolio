import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import MagneticButton from "./MagneticButton";
import FloatingShapes from "./FloatingShapes";
import ProjectModal from "./ProjectModal";
import { useParallax } from "@/hooks/use-parallax";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  const { ref: headerRef, style: headerStyle } = useParallax({
    speed: 0.9,
    direction: 'up',
    opacity: true
  });
  
  const { ref: projectsRef, style: projectsStyle } = useParallax({
    speed: 0.7,
    direction: 'up'
  });
  
  const { ref, inView } = useScrollTrigger();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Array of parallax refs and styles for each project card with more dramatic effects
  const projectParallax = projects.map((_, index) => {
    const direction = index % 3 === 0 ? 'up' : (index % 3 === 1 ? 'right' : 'left');
    return useParallax({
      speed: 1.2 + (index * 0.2), // Higher speed for more dramatic effect
      direction: direction as 'up' | 'right' | 'left',
      scale: index % 2 === 0,
      rotation: index % 3 === 2 // Add rotation to some cards
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
    <section id="projects" className="flex items-center relative min-h-[150vh] py-32 bg-black/[0.02] dark:bg-white/[0.02]">
      <FloatingShapes />
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          ref={headerRef}
          style={headerStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="max-w-xl mx-auto opacity-80">
            A selection of my recent work across web applications, interactive experiences, and creative coding.
          </p>
        </motion.div>
        
        <motion.div 
          ref={projectsRef}
          style={projectsStyle}
          animate={inView ? "visible" : "hidden"}
          initial="hidden"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              ref={projectParallax[index].ref}
              style={projectParallax[index].style}
              className="project-card bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md"
              variants={itemVariants}
              custom={index}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.tags.slice(0, 3).join(", ")}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <button 
                    className="text-primary flex items-center text-sm font-medium"
                    onClick={() => openProjectDetails(project.id)}
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <div className="flex space-x-2">
                    <a 
                      href={project.repo} 
                      className="w-8 h-8 rounded-full bg-muted dark:bg-background flex items-center justify-center" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.demo} 
                      className="w-8 h-8 rounded-full bg-muted dark:bg-background flex items-center justify-center" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <MagneticButton asChild>
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
      
      {selectedProject !== null && (
        <ProjectModal 
          project={projects.find(p => p.id === selectedProject)!} 
          onClose={closeProjectDetails} 
        />
      )}
    </section>
  );
}