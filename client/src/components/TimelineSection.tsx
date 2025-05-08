import { motion } from "framer-motion";
import FloatingShapes from "./FloatingShapes";
import { useParallax } from "@/hooks/use-parallax";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

export default function TimelineSection() {
  const { ref: headerRef, style: headerStyle } = useParallax(0.7);
  const { ref, inView } = useScrollTrigger();
  
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
  
  const timelineItems = [
    {
      period: "2021 - Present",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      description: "Lead frontend developer for enterprise applications. Architected scalable solutions using React, TypeScript, and state management libraries. Mentored junior developers and established frontend best practices.",
      skills: ["React", "TypeScript", "Redux"],
      isLeft: true
    },
    {
      period: "2018 - 2021",
      title: "Frontend Developer",
      company: "InnovateX Agency",
      description: "Developed responsive websites and web applications for clients across various industries. Collaborated with designers to implement pixel-perfect UIs with accessibility in mind.",
      skills: ["JavaScript", "Vue.js", "SCSS"],
      isLeft: false
    },
    {
      period: "2014 - 2018",
      title: "BSc Computer Science",
      company: "Tech University",
      description: "Graduated with honors in Computer Science with a focus on web technologies and human-computer interaction. Created several award-winning projects during my studies.",
      skills: ["Algorithms", "Web Development", "UX Design"],
      isLeft: true
    }
  ];

  return (
    <section id="timeline" className="flex items-center relative">
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
            My <span className="text-primary">Journey</span>
          </h2>
          <p className="max-w-xl mx-auto opacity-80">
            The path that led me to where I am today, including education, work experience, and key milestones.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative"
          ref={ref}
          animate={inView ? "visible" : "hidden"}
          initial="hidden"
          variants={containerVariants}
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20 z-0"></div>
          
          {/* Timeline items */}
          <div className="timeline-container">
            {timelineItems.map((item, index) => (
              <TimelineItem 
                key={index}
                period={item.period}
                title={item.title}
                company={item.company}
                description={item.description}
                skills={item.skills}
                isLeft={item.isLeft}
                isLast={index === timelineItems.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  period: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  isLeft: boolean;
  isLast: boolean;
}

function TimelineItem({ period, title, company, description, skills, isLeft, isLast }: TimelineItemProps) {
  const itemVariants = {
    hidden: { x: isLeft ? -30 : 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className={`mb-12 md:mb-24 relative flex flex-col md:flex-row ${!isLeft ? 'md:flex-row-reverse' : ''} ${isLast ? 'mb-0' : ''}`}
      variants={itemVariants}
    >
      <div className={`timeline-dot-container md:w-1/2 flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} order-1 ${isLeft ? 'md:pr-8' : 'md:pl-8'} pb-8 md:pb-0`}>
        <motion.div 
          className="w-8 h-8 rounded-full bg-primary z-10 relative flex items-center justify-center"
          variants={dotVariants}
        >
          <div className="w-3 h-3 rounded-full bg-white"></div>
        </motion.div>
      </div>
      
      <div className={`md:w-1/2 order-2 ${isLeft ? 'md:pl-8' : 'md:pr-8'} bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md`}>
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
          {period}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <h4 className="text-lg mb-3 opacity-80">{company}</h4>
        <p className="text-sm">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-muted dark:bg-background rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
