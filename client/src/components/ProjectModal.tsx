import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { GitPullRequest, ExternalLink, X } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div 
          className="bg-background dark:bg-[#1a1a1a] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-6 md:p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold font-display">{project.title}</h3>
            <button 
              onClick={onClose}
              className="text-2xl hover:text-primary transition-colors"
              aria-label="Close modal"
            >
              <X />
            </button>
          </div>
          
          <div className="mb-6">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg mb-4" 
            />
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="mb-4">{project.description}</p>
            
            <h4 className="font-bold mb-2">Key Features</h4>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end space-x-4">
            <a 
              href={project.repo}
              className="px-4 py-2 rounded-lg bg-muted dark:bg-background flex items-center"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <GitPullRequest className="mr-2 h-5 w-5" />
              <span>Repository</span>
            </a>
            
            <a 
              href={project.demo}
              className="px-4 py-2 rounded-lg bg-primary text-white flex items-center"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              <span>Live Demo</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
