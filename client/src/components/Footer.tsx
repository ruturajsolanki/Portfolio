import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Footer() {
  return (
    <motion.footer 
      className="py-8 bg-muted dark:bg-[#1a1a1a] mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold font-display">
              Ruturaj<span className="text-primary">.</span>
            </Link>
            <p className="text-sm opacity-70 mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link>
            <Link href="/projects" className="text-sm hover:text-primary transition-colors">Projects</Link>
            <Link href="/skills" className="text-sm hover:text-primary transition-colors">Skills</Link>
            <Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm opacity-70">Built with ❤️ using React & Tailwind</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
