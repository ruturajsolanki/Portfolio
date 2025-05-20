import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Link as LinkIcon, ArrowRight, Download, Loader2 } from "lucide-react";
import MagneticButton from "./MagneticButton";
import FloatingShapes from "./FloatingShapes";
import { useParallax } from "@/hooks/use-parallax";
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { ref: headerRef, style: headerStyle } = useParallax({ speed: 0.7 });
  const { ref: formRef, style: formStyle } = useParallax({ speed: 0.5 });
  const { ref: infoRef, style: infoStyle } = useParallax({ speed: 0.8 });
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  // Form submission mutation
  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="flex items-center relative">
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
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="max-w-xl mx-auto opacity-80">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md order-2 md:order-1"
            ref={formRef}
            style={formStyle}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h3 
              className="text-xl font-bold mb-6"
              variants={itemVariants}
            >
              Send Me a Message
            </motion.h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm mb-1 opacity-80">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="w-full px-4 py-2 rounded-lg bg-muted dark:bg-background border-0 focus:ring-2 focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm mb-1 opacity-80">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            className="w-full px-4 py-2 rounded-lg bg-muted dark:bg-background border-0 focus:ring-2 focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm mb-1 opacity-80">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Project Inquiry" 
                            className="w-full px-4 py-2 rounded-lg bg-muted dark:bg-background border-0 focus:ring-2 focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm mb-1 opacity-80">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project or inquiry..." 
                            className="w-full px-4 py-2 rounded-lg bg-muted dark:bg-background border-0 focus:ring-2 focus:ring-primary min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <MagneticButton asChild>
                    <Button 
                      type="submit" 
                      className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </MagneticButton>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 space-y-6"
            ref={infoRef}
            style={infoStyle}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:ruturajsolanki43@gmail.com" className="text-primary hover:underline">
                      ruturajsolanki43@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-primary">Gujarat, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <LinkIcon className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Social Media</h4>
                    <div className="flex space-x-3 mt-2">
                      <a 
                        href="https://github.com/ruturajsolanki" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted dark:bg-background flex items-center justify-center transition-transform hover:scale-110" 
                        aria-label="GitHub"
                      >
                        <FaGithub />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/ruturaj-solanki-40959411a/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted dark:bg-background flex items-center justify-center transition-transform hover:scale-110" 
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin />
                      </a>
                      <a 
                        href="https://www.cloudskillsboost.google/public_profiles/74982125-0925-482f-ae9d-eaf665d0740a" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted dark:bg-background flex items-center justify-center transition-transform hover:scale-110" 
                        aria-label="Google Cloud"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-4">Download CV</h3>
              <p className="opacity-80 mb-4">Get my complete resume with detailed experience and skills.</p>
              <MagneticButton asChild>
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Download className="mr-2 h-5 w-5" />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
