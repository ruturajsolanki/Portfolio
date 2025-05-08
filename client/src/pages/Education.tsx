import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function Education() {
  const eduSectionRef = useRef(null);
  const headerSectionRef = useRef(null);
  const timelineSectionRef = useRef(null);
  const certificationsSectionRef = useRef(null);
  
  // Set up inView states for animation triggering
  const inView = useInView(eduSectionRef, { once: false });
  const headerInView = useInView(headerSectionRef, { once: false });
  const timelineInView = useInView(timelineSectionRef, { once: false });
  const certificationsInView = useInView(certificationsSectionRef, { once: false });
  
  // Apply subtle parallax for header and timeline
  const { ref: headerRef, style: headerStyle } = useParallax({ 
    speed: 0.3, 
    direction: 'up'
  });
  
  const { ref: timelineRef, style: timelineStyle } = useParallax({ 
    speed: 0.2, 
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
  
  // Additional parallax effects
  const { ref: certificationsRef, style: certificationsStyle } = useParallax({
    speed: 0.15,
    direction: 'right'
  });
  
  const { ref: continuousLearningRef, style: continuousLearningStyle } = useParallax({
    speed: 0.25,
    direction: 'up'
  });
  
  // Define timeline data for experience and education
  const timeline = [
    {
      period: "2022 - Present",
      title: "B.Tech in Computer Science",
      company: "Gujarat Technological University",
      location: "Gujarat, India",
      description: "Currently pursuing B.Tech in Computer Science with focus on Machine Learning, AI, and Software Development. Active participant in coding competitions and hackathons.",
      skills: ["Machine Learning", "AI", "Software Development", "Problem Solving"]
    },
    {
      period: "2019 - 2022",
      title: "Diploma in Computer Engineering",
      company: "Gujarat Technological University",
      location: "Gujarat, India",
      description: "Completed Diploma in Computer Engineering with distinction. Developed strong foundation in programming, data structures, and algorithms.",
      skills: ["Programming", "Data Structures", "Algorithms", "Web Development"]
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
        <section ref={eduSectionRef} className="py-24 relative bg-gradient-to-b from-background to-background/95">
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
                My <span className="text-primary">Journey</span>
              </h1>
              <p className="max-w-2xl mx-auto opacity-80 text-lg">
                Professional experience and educational background that shaped my career path.
              </p>
            </motion.div>
            
            <motion.div 
              ref={(el) => {
                // Assign to both refs
                if (el) {
                  // @ts-ignore - This is fine for DOM refs
                  timelineRef.current = el;
                  // @ts-ignore
                  timelineSectionRef.current = el;
                }
              }}
              style={timelineStyle}
              animate={inView ? "visible" : "hidden"}
              initial="hidden"
              variants={containerVariants}
              className="relative max-w-4xl mx-auto"
            >
              {/* Timeline center line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-px bg-primary/20 z-0"></div>
              
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center mb-16 relative ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"></div>
                  
                  {/* Content card */}
                  <div className={`w-5/12 bg-white dark:bg-[#161616] p-6 rounded-lg shadow-lg relative ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 -mt-px rotate-45 bg-white dark:bg-[#161616] ${index % 2 === 0 ? '-right-2' : '-left-2'}"></div>
                    
                    <div className="flex items-center mb-2 text-primary">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{item.period}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    
                    <div className="flex items-center mb-3">
                      <Briefcase className="w-4 h-4 mr-2 opacity-60" />
                      <span className="text-sm opacity-70">{item.company}</span>
                      <span className="mx-2 opacity-40">|</span>
                      <MapPin className="w-4 h-4 mr-2 opacity-60" />
                      <span className="text-sm opacity-70">{item.location}</span>
                    </div>
                    
                    <p className="mb-4 text-sm">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-20 text-center max-w-3xl mx-auto"
              ref={(el) => {
                // Assign to both refs
                if (el) {
                  // @ts-ignore - This is fine for DOM refs
                  certificationsRef.current = el;
                  // @ts-ignore
                  certificationsSectionRef.current = el;
                }
              }}
              style={certificationsStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Certifications & Additional Education</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow-md text-left hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">Google Cloud Digital Leader</h4>
                  </div>
                  <p className="text-sm opacity-70 mb-2">Google Cloud, 2024</p>
                  <p className="text-sm">Understanding of Google Cloud products and services, cloud concepts, and digital transformation.</p>
                </div>
                
                <div className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow-md text-left hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">Machine Learning Specialization</h4>
                  </div>
                  <p className="text-sm opacity-70 mb-2">2023</p>
                  <p className="text-sm">Comprehensive training in machine learning algorithms, neural networks, and deep learning applications.</p>
                </div>
                
                <div className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow-md text-left hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">Flutter Development Bootcamp</h4>
                  </div>
                  <p className="text-sm opacity-70 mb-2">Udemy, 2023</p>
                  <p className="text-sm">Mastered cross-platform mobile app development using Flutter framework and Dart programming language.</p>
                </div>
                
                <div className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow-md text-left hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">Web Development Fundamentals</h4>
                  </div>
                  <p className="text-sm opacity-70 mb-2">FreeCodeCamp, 2022</p>
                  <p className="text-sm">Comprehensive training in HTML, CSS, JavaScript, and modern web development practices.</p>
                </div>
              </div>
              
              <motion.div 
                className="mt-12 bg-muted/30 dark:bg-muted/10 p-8 rounded-xl"
                ref={continuousLearningRef}
                style={continuousLearningStyle}
              >
                <h4 className="font-semibold text-xl mb-4">Continuous Learning</h4>
                <p className="text-sm max-w-2xl mx-auto">
                  I am passionate about continuous learning and staying updated with the latest technologies. Currently focusing on advanced machine learning concepts, cloud computing, and mobile app development. I regularly participate in coding competitions, contribute to open-source projects, and engage in online learning platforms to enhance my skills.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}