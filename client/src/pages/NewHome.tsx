import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { projects } from "@/lib/data";

export default function NewHome() {
  // Apply parallax effects with subtle settings
  const { ref: heroRef, style: heroStyle } = useParallax({ 
    speed: 0.4, 
    direction: 'up'
  });
  
  const { ref: projectsRef, style: projectsStyle } = useParallax({ 
    speed: 0.3, 
    direction: 'up'
  });
  
  const { ref: skillsRef, style: skillsStyle } = useParallax({ 
    speed: 0.3, 
    direction: 'right'
  });
  
  return (
    <div className="font-sans bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-500">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden">
          {/* More interesting background with animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background/95 z-0">
            <div className="absolute inset-0 opacity-30 dark:opacity-20 mix-blend-soft-light">
              <div className="absolute top-0 -left-4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 right-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/4 right-0 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            
            {/* Abstract grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                ref={heroRef}
                style={heroStyle}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                  Creative <span className="text-primary">Developer</span> & UI Designer
                </h1>
                
                <p className="text-xl opacity-80 mb-8 max-w-lg">
                  I build elegant digital experiences with modern technologies and minimalist design principles.
                </p>
                
                <div className="flex flex-wrap gap-5">
                  <MagneticButton asChild>
                    <Link href="/projects" className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                      View Projects
                    </Link>
                  </MagneticButton>
                  
                  <MagneticButton asChild>
                    <Link href="/contact" className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
                      Get In Touch
                    </Link>
                  </MagneticButton>
                </div>
                
                <div className="mt-12 flex items-center space-x-6">
                  <a href="https://github.com/ruturajsolanki" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.582 9.5 21.27 9.5 21C9.5 20.761 9.492 20.049 9.489 19.159C6.92 19.792 6.35 17.681 6.35 17.681C5.902 16.45 5.258 16.139 5.258 16.139C4.36 15.495 5.329 15.507 5.329 15.507C6.33 15.577 6.857 16.566 6.857 16.566C7.752 18.12 9.255 17.727 9.518 17.469C9.611 16.81 9.878 16.417 10.173 16.2C8.116 15.98 5.947 15.081 5.947 11.234C5.947 10.11 6.34 9.194 6.878 8.481C6.773 8.23 6.424 7.197 7.016 5.902C7.016 5.902 7.823 5.628 9.475 6.839C10.27 6.615 11.119 6.503 11.964 6.499C12.806 6.503 13.657 6.615 14.454 6.839C16.104 5.628 16.91 5.902 16.91 5.902C17.504 7.197 17.155 8.23 17.05 8.481C17.59 9.194 17.98 10.11 17.98 11.234C17.98 15.093 15.807 15.976 13.74 16.191C14.112 16.461 14.447 17.001 14.447 17.823C14.447 19.001 14.436 20.671 14.436 21C14.436 21.274 14.594 21.589 15.105 21.488C19.075 20.162 21.937 16.417 21.937 12C21.937 6.477 17.461 2 12 2" fill="currentColor"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/ruturaj-solanki-40959411a/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 11.888 14.671 11.802 14.505 11.802C14.34 11.802 13.372 11.845 13.372 13.174C13.372 13.344 13.372 17 13.372 17H10.999V10H13.372V11.013C13.746 10.443 14.562 10 16.025 10C17.488 10 18 11.801 18 13.174V17Z" fill="currentColor"/></svg>
                  </a>
                  <a href="https://www.cloudskillsboost.google/public_profiles/74982125-0925-482f-ae9d-eaf665d0740a" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/></svg>
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-70 dark:opacity-40"></div>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1028&q=80" 
                  alt="Developer Portrait" 
                  className="w-96 h-96 object-cover rounded-2xl border-4 border-white dark:border-[#1a1a1a] shadow-lg mx-auto relative z-10"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="py-24 bg-muted/20 dark:bg-muted/10 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center mb-16"
              ref={projectsRef}
              style={projectsStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Featured <span className="text-primary">Projects</span>
              </h2>
              <p className="max-w-xl mx-auto opacity-80">
                A selection of my recent work. Creative solutions for real-world problems.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="bg-white dark:bg-[#161616] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <MagneticButton asChild>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
        
        {/* Skills Overview Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto"
              ref={skillsRef}
              style={skillsStyle}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                My <span className="text-primary">Expertise</span>
              </h2>
              
              <p className="text-lg mb-8 opacity-80">
                With over 5 years of experience in web development, I specialize in creating responsive, accessible, and performant web applications using modern technologies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-[#161616] p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    </span>
                    Frontend Development
                  </h3>
                  <p className="mb-4 opacity-80">Creating responsive and interactive user interfaces with modern frameworks and libraries.</p>
                  <div className="flex flex-wrap gap-2">
                    {["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#161616] p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </span>
                    AI & Machine Learning
                  </h3>
                  <p className="mb-4 opacity-80">Building intelligent solutions using machine learning and artificial intelligence.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Machine Learning", "NLP", "Data Analysis", "RAG Systems"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <MagneticButton asChild>
                  <Link 
                    href="/skills" 
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <span>View All Skills</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-24 bg-primary/5 dark:bg-primary/10 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Ready to bring your ideas to life?
              </h2>
              
              <p className="text-lg mb-8 opacity-80">
                I'm currently available for freelance work. If you have a project in mind or just want to chat, feel free to get in touch!
              </p>
              
              <MagneticButton asChild>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-lg font-medium"
                >
                  <span>Let's Connect</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}