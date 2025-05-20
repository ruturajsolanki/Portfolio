import { motion, useInView } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { projects } from "@/lib/data";
import FloatingShapes from "@/components/FloatingShapes";
import MyImage from '/IMG_3588.jpeg';


export default function Home() {
  // Create section refs for inView detection
  const homeSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  
  // Setup inView states for animation triggering
  const homeInView = useInView(homeSectionRef, { once: false });
  const projectsInView = useInView(projectsSectionRef, { once: false });
  const skillsInView = useInView(skillsSectionRef, { once: false });
  
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
  
  // Additional parallax effects for visual interest
  const { ref: imageRef, style: imageStyle } = useParallax({
    speed: 0.2,
    direction: 'down'
  });
  
  const { ref: ctaRef, style: ctaStyle } = useParallax({
    speed: 0.15,
    direction: 'up'
  });
  
  const { ref: socialRef, style: socialStyle } = useParallax({
    speed: 0.1,
    direction: 'right'
  });

  return (
    <div className="font-sans bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-500">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={homeSectionRef} className="min-h-screen flex items-center relative overflow-hidden">
          {/* Advanced background with animated gradients and grid pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background/95 z-0">
            <div className="absolute inset-0 opacity-30 dark:opacity-20 mix-blend-soft-light">
              <div className="absolute top-0 -left-4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 right-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/4 right-0 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            
            {/* Abstract grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
            
            {/* Add floating shapes for a more dynamic feel */}
            <FloatingShapes />
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
                  Computer Science & <span className="text-primary">Engineering</span> Student
                </h1>
                
                <p className="text-xl opacity-80 mb-8 max-w-lg">
                  I specialize in AI, full-stack development, and cloud technologies. Building intelligent systems like AI voice assistants, document-based Q&A apps (RAG), and text summarizers.
                </p>
                
                <div className="flex flex-wrap gap-5" ref={ctaRef} style={ctaStyle}>
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
                  <MagneticButton asChild>
                    <a
                      href="/Ruturaj_Solanki_Resume_CS_.pdf"
                      download
                      className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-colors"
                      style={{ display: 'inline-block' }}
                    >
                      Download Resume
                    </a>
                  </MagneticButton>
                </div>
                
                <div className="mt-12 flex items-center space-x-6" ref={socialRef} style={socialStyle}>
                  <a href="https://github.com/ruturajsolanki" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.42 4.53 14.42 3.9 14.25C4.41 15.94 5.99 17.18 7.88 17.21C5.61 18.87 2.77 19.01 0 18.35C1.89 19.48 4.13 20.13 6.55 20.13C16 20.13 20.33 12.46 20.33 5.79C20.33 5.6 20.33 5.42 20.32 5.23C21.16 4.63 21.88 3.87 22.46 3" fill="currentColor"/></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.42 4.53 14.42 3.9 14.25C4.41 15.94 5.99 17.18 7.88 17.21C5.61 18.87 2.77 19.01 0 18.35C1.89 19.48 4.13 20.13 6.55 20.13C16 20.13 20.33 12.46 20.33 5.79C20.33 5.6 20.33 5.42 20.32 5.23C21.16 4.63 21.88 3.87 22.46 3" fill="currentColor"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/ruturaj-solanki-40959411a/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 11.888 14.671 11.802 14.505 11.802C14.34 11.802 13.372 11.845 13.372 13.174C13.372 13.344 13.372 17 13.372 17H10.999V10H13.372V11.013C13.746 10.443 14.562 10 16.025 10C17.488 10 18 11.801 18 13.174V17Z" fill="currentColor"/></svg>
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                ref={imageRef}
                style={imageStyle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-70 dark:opacity-40"></div>
                <img 
                  src={MyImage} 
                  alt="Developer Portrait" 
                  className="w-96 h-96 object-cover rounded-2xl border-4 border-white dark:border-[#1a1a1a] shadow-lg mx-auto relative z-10"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section - Preview of Projects Page */}
        <section ref={projectsSectionRef} className="py-24 bg-muted/20 dark:bg-muted/10 relative">
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
        
        {/* Skills Preview Section */}
        <section ref={skillsSectionRef} className="py-24 relative">
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
                I blend NLP, automation, and user-centric design using tools like Python, FastAPI, Docker, and LLMs. Currently exploring the intersection of AI, cybersecurity, and scalable app development.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-[#161616] p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    </span>
                    AI & Machine Learning
                  </h3>
                  <p className="mb-4 opacity-80">Building intelligent systems with NLP, RAG, and LLMs for real-world applications.</p>
                </div>
                
                <div className="bg-white dark:bg-[#161616] p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </span>
                    Full-Stack Development
                  </h3>
                  <p className="mb-4 opacity-80">Creating scalable applications with Python, FastAPI, and modern web technologies.</p>
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
                Ready to collaborate on innovative projects?
              </h2>
              
              <p className="text-lg mb-8 opacity-80">
                I'm passionate about solving real-world problems through software—whether it's enhancing productivity, enabling better decision-making, or making complex tech more accessible.
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
