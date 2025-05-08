import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { SiPython, SiJavascript, SiReact, SiTailwindcss, SiGit, SiGooglecloud, SiTensorflow, SiPytorch, SiPandas, SiNumpy, SiScikitlearn, SiFlutter, SiDart, SiFirebase, SiAppstore, SiAmazon, SiMysql, SiBootstrap, SiHtml5, SiCss3, SiVsco, SiIntellijidea, SiLinux } from "react-icons/si";
import { FaDatabase, FaRobot, FaBrain, FaCode, FaShieldAlt, FaTools, FaJava, FaServer, FaMobile } from "react-icons/fa";

export default function Skills() {
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const additionalSkillsRef = useRef<HTMLDivElement>(null);
  
  // Set up inView states for animation triggering
  const inView = useInView(skillsSectionRef, { once: false });
  const headerInView = useInView(headerSectionRef, { once: false });
  const skillsGridInView = useInView(skillsGridRef, { once: false });
  const additionalInView = useInView(additionalSkillsRef, { once: false });
  
  // Apply subtle parallax
  const { ref: headerRef, style: headerStyle } = useParallax({ 
    speed: 0.3, 
    direction: 'up'
  });
  
  const { ref: skillsRef, style: skillsStyle } = useParallax({ 
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
  
  const { ref: additionalRef, style: additionalStyle } = useParallax({
    speed: 0.15,
    direction: 'right'
  });
  
  // Define skill categories with expanded details
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", icon: SiPython, level: 95, details: "Core Python, OOP, Data Structures" },
        { name: "Java", icon: FaJava, level: 90, details: "Object-oriented Programming, JSP" },
        { name: "C", icon: FaCode, level: 85, details: "System Programming, Data Structures" },
        { name: "JavaScript", icon: SiJavascript, level: 90, details: "ES6+, DOM Manipulation" },
      ]
    },
    {
      title: "Frameworks & Web Development",
      skills: [
        { name: "Flutter", icon: SiFlutter, level: 90, details: "Cross-platform Mobile Development" },
        { name: "React", icon: SiReact, level: 85, details: "Hooks, Components, State Management" },
        { name: "HTML/CSS", icon: SiHtml5, level: 90, details: "Semantic HTML, Responsive Design" },
        { name: "Bootstrap", icon: SiBootstrap, level: 85, details: "UI Components, Grid System" },
        { name: "JSP", icon: FaServer, level: 80, details: "Server-side Java Web Development" },
      ]
    },
    {
      title: "Cloud & Databases",
      skills: [
        { name: "AWS", icon: SiAmazon, level: 85, details: "Cloud Services, Deployment" },
        { name: "MySQL", icon: SiMysql, level: 85, details: "Database Design, Query Optimization" },
        { name: "Firebase", icon: SiFirebase, level: 80, details: "Backend Services, Authentication" },
      ]
    },
    {
      title: "Machine Learning & AI",
      skills: [
        { name: "TensorFlow", icon: SiTensorflow, level: 85, details: "Deep Learning, Neural Networks" },
        { name: "Scikit-learn", icon: SiScikitlearn, level: 90, details: "ML Algorithms, Model Training" },
        { name: "NLP", icon: FaBrain, level: 85, details: "Text Processing, Sentiment Analysis" },
      ]
    },
    {
      title: "Developer Tools",
      skills: [
        { name: "Android Studio", icon: FaMobile, level: 90, details: "Mobile App Development" },
        { name: "VS Code", icon: SiVsco, level: 95, details: "Code Editor, Extensions" },
        { name: "GitHub", icon: SiGit, level: 90, details: "Version Control, Collaboration" },
        { name: "IntelliJ IDEA", icon: SiIntellijidea, level: 85, details: "Java Development" },
        { name: "Linux", icon: SiLinux, level: 80, details: "System Administration" },
      ]
    }
  ];
  
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

  return (
    <div className="font-sans bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-500">
      <Navbar />
      
      <main>
        <section ref={skillsSectionRef} className="py-24 relative bg-gradient-to-b from-background to-background/95">
          <div ref={bgRef} style={bgStyle} className="absolute inset-0 bg-gradient-to-b from-background to-background/95 z-0"></div>
          <div ref={gridPatternRef} style={gridPatternStyle} className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center mb-16"
              ref={headerSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                My <span className="text-primary">Skills</span>
              </h1>
              <p className="max-w-2xl mx-auto opacity-80 text-lg">
                A comprehensive overview of my technical expertise in Machine Learning, Data Science, and Web Development.
              </p>
            </motion.div>
            
            <motion.div 
              ref={skillsGridRef}
              animate={inView ? "visible" : "hidden"}
              initial="hidden"
              variants={containerVariants}
              className="space-y-16"
            >
              {skillCategories.map((category, catIndex) => (
                <motion.div key={category.title} variants={itemVariants} custom={catIndex}>
                  <h2 className="text-2xl font-semibold mb-8 pb-2 border-b border-muted dark:border-muted/30">
                    {category.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => {
                      const Icon = skill.icon;
                      
                      return (
                        <motion.div 
                          key={skill.name}
                          className="bg-white dark:bg-[#161616] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                          variants={itemVariants}
                          custom={skillIndex}
                        >
                          <div className="flex items-center mb-3">
                            <div className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                              <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg">{skill.name}</h3>
                          </div>
                          
                          {skill.details && (
                            <p className="text-sm text-muted-foreground mb-4">{skill.details}</p>
                          )}
                          
                          <div className="w-full bg-muted dark:bg-muted/30 rounded-full h-2.5 mb-2">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-right">{skill.level}%</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-20 p-8 bg-muted/50 dark:bg-muted/10 rounded-xl"
              ref={additionalSkillsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-xl mb-4">Additional Skills & Knowledge</h3>
              
              <div className="flex flex-wrap gap-3">
                {[
                  "Data Preprocessing", "Feature Engineering", "Model Evaluation", 
                  "Hyperparameter Tuning", "Natural Language Processing", "Computer Vision",
                  "Deep Learning", "Statistical Analysis", "Data Visualization",
                  "API Development", "Responsive Design", "Version Control",
                  "Cloud Computing", "Problem Solving", "Technical Documentation",
                  "Mobile UI/UX", "State Management", "Local Storage",
                  "Push Notifications", "App Performance", "Cross-platform Development",
                  "CTF Challenges", "Cybersecurity", "Communication",
                  "Critical Thinking", "Creativity", "Adaptability"
                ].map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-white dark:bg-[#161616] rounded-full text-sm shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}