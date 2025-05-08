import { motion } from "framer-motion";
import FloatingShapes from "./FloatingShapes";
import { useParallax } from "@/hooks/use-parallax";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { Code, Server, Drill } from "lucide-react";
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiTailwindcss,
  SiNodedotjs, SiMongodb, SiExpress, SiPostgresql, SiGraphql, SiFirebase,
  SiGithub, SiJest
} from "react-icons/si";
import { Cloud } from "lucide-react";

export default function SkillsSection() {
  const { ref: headerRef, style: headerStyle } = useParallax({
    speed: 0.7,
    direction: 'up',
    opacity: true
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
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };
  
  const frontendSkills = [
    { icon: <SiHtml5 className="text-3xl text-orange-500" />, name: "HTML5" },
    { icon: <SiCss3 className="text-3xl text-blue-500" />, name: "CSS3" },
    { icon: <SiJavascript className="text-3xl text-yellow-500" />, name: "JavaScript" },
    { icon: <SiReact className="text-3xl text-blue-400" />, name: "React" },
    { icon: <SiVuedotjs className="text-3xl text-green-500" />, name: "Vue.js" },
    { icon: <SiTailwindcss className="text-3xl text-teal-500" />, name: "Tailwind" }
  ];
  
  const backendSkills = [
    { icon: <SiNodedotjs className="text-3xl text-green-600" />, name: "Node.js" },
    { icon: <SiMongodb className="text-3xl text-blue-600" />, name: "MongoDB" },
    { icon: <SiExpress className="text-3xl text-red-500" />, name: "Express" },
    { icon: <SiPostgresql className="text-3xl text-blue-400" />, name: "PostgreSQL" },
    { icon: <SiGraphql className="text-3xl text-purple-500" />, name: "GraphQL" },
    { icon: <SiFirebase className="text-3xl text-green-500" />, name: "Firebase" }
  ];
  
  const toolsSkills = [
    { icon: <SiGithub className="text-3xl" />, name: "Git/GitHub" },
    { icon: <Code className="text-3xl text-gray-600 dark:text-gray-400" />, name: "Terminal" },
    { icon: <Server className="text-3xl text-red-500" />, name: "npm" },
    { icon: <SiJest className="text-3xl text-green-500" />, name: "Jest" },
    { icon: <Cloud className="text-3xl text-blue-400" />, name: "AWS" },
    { icon: <Drill className="text-3xl text-purple-500" />, name: "CI/CD" }
  ];

  return (
    <section id="skills" className="flex items-center relative">
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
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="max-w-xl mx-auto opacity-80">
            My toolbox of languages, frameworks, and technologies that I use to build amazing digital experiences.
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          animate={inView ? "visible" : "hidden"}
          initial="hidden"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md"
            variants={cardVariants}
          >
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
              <Code className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Frontend</h3>
            <div className="grid grid-cols-3 gap-4">
              {frontendSkills.map((skill, i) => (
                <motion.div 
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-muted dark:hover:bg-background transition-colors"
                  custom={i}
                  variants={iconVariants}
                >
                  <div className="mb-2">{skill.icon}</div>
                  <span className="text-xs text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md"
            variants={cardVariants}
          >
            <div className="inline-block p-3 rounded-full bg-secondary/10 mb-4">
              <Server className="text-2xl text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Backend</h3>
            <div className="grid grid-cols-3 gap-4">
              {backendSkills.map((skill, i) => (
                <motion.div 
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-muted dark:hover:bg-background transition-colors"
                  custom={i}
                  variants={iconVariants}
                >
                  <div className="mb-2">{skill.icon}</div>
                  <span className="text-xs text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md"
            variants={cardVariants}
          >
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
              <Drill className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Tools & Others</h3>
            <div className="grid grid-cols-3 gap-4">
              {toolsSkills.map((skill, i) => (
                <motion.div 
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-muted dark:hover:bg-background transition-colors"
                  custom={i}
                  variants={iconVariants}
                >
                  <div className="mb-2">{skill.icon}</div>
                  <span className="text-xs text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
