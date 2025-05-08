import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Helper to determine active link
  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 dark:bg-background/80 backdrop-blur-md transition-colors">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold font-display">
            Ruturaj<span className="text-primary">.</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={`animated-underline ${isActive('/') ? 'text-primary font-medium' : ''}`}>
              Home
            </Link>
            <Link href="/projects" className={`animated-underline ${isActive('/projects') ? 'text-primary font-medium' : ''}`}>
              Projects
            </Link>
            <Link href="/skills" className={`animated-underline ${isActive('/skills') ? 'text-primary font-medium' : ''}`}>
              Skills
            </Link>
            <Link href="/education" className={`animated-underline ${isActive('/education') ? 'text-primary font-medium' : ''}`}>
              Education
            </Link>
            <Link href="/certifications" className={`animated-underline ${isActive('/certifications') ? 'text-primary font-medium' : ''}`}>
              Certifications
            </Link>
            <Link href="/contact" className={`animated-underline ${isActive('/contact') ? 'text-primary font-medium' : ''}`}>
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full bg-muted dark:bg-muted text-foreground dark:text-foreground transition-colors"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background dark:bg-background z-50 flex flex-col justify-center items-center space-y-8 text-2xl"
          >
            <button
              className="absolute top-5 right-5"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
            <Link href="/" className={`mobile-link ${isActive('/') ? 'text-primary' : ''}`} onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/projects" className={`mobile-link ${isActive('/projects') ? 'text-primary' : ''}`} onClick={closeMobileMenu}>
              Projects
            </Link>
            <Link href="/skills" className={`mobile-link ${isActive('/skills') ? 'text-primary' : ''}`} onClick={closeMobileMenu}>
              Skills
            </Link>
            <Link href="/education" className={`mobile-link ${isActive('/education') ? 'text-primary' : ''}`} onClick={closeMobileMenu}>
              Education
            </Link>
            <Link href="/certifications" className={`mobile-link ${isActive('/certifications') ? 'text-primary' : ''}`} onClick={closeMobileMenu}>
              Certifications
            </Link>
            <Link href="/contact" className={`mobile-link ${isActive('/contact') ? 'text-primary' : ''}`} onClick={closeMobileMenu}>
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
