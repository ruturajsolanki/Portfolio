import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="w-6 h-6 text-foreground" />
    </motion.div>
  );
}
