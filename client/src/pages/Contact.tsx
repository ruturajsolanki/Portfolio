import { useState } from 'react';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParallax } from "@/hooks/use-parallax";
import { contactSchema } from "@shared/schema";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";

type ContactFormValues = z.infer<typeof contactSchema>;

// Extended schema with validation rules
const contactFormSchema = contactSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

export default function Contact() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const contactSectionRef = useRef(null);
  const headerSectionRef = useRef(null);
  const formSectionRef = useRef(null);
  const contactInfoSectionRef = useRef(null);
  
  // Set up inView states for animation triggering
  const inView = useInView(contactSectionRef, { once: false });
  const headerInView = useInView(headerSectionRef, { once: false });
  const formInView = useInView(formSectionRef, { once: false });
  const contactInfoInView = useInView(contactInfoSectionRef, { once: false });
  
  // Setup subtle parallax effects
  const { ref: headerRef, style: headerStyle } = useParallax({ 
    speed: 0.1, 
    direction: 'up'
  });
  
  const { ref: formRef, style: formStyle } = useParallax({ 
    speed: 0.05, 
    direction: 'up'
  });
  
  const { ref: contactInfoRef, style: contactInfoStyle } = useParallax({ 
    speed: 0.08, 
    direction: 'left'
  });
  
  // Background parallax effects
  const { ref: bgRef, style: bgStyle } = useParallax({
    speed: 0.1,
    direction: 'down'
  });
  
  const { ref: gridPatternRef, style: gridPatternStyle } = useParallax({
    speed: 0.05,
    direction: 'right'
  });
  
  // Form handling
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you as soon as possible.",
      });
      form.reset();
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      });
    }
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
        staggerChildren: 0.2
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
        <section ref={contactSectionRef} className="py-24 relative bg-gradient-to-b from-background to-background/95">
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
                Let's <span className="text-primary">Connect</span>
              </h1>
              <p className="max-w-2xl mx-auto opacity-80 text-lg">
                Interested in collaborating on AI, full-stack development, or cloud projects? Feel free to reach out!
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
              <motion.div 
                className="lg:col-span-3 order-2 lg:order-1"
                ref={(el) => {
                  // Assign to both refs
                  if (el) {
                    // @ts-ignore - This is fine for DOM refs
                    formRef.current = el;
                    // @ts-ignore
                    formSectionRef.current = el;
                  }
                }}
                style={formStyle}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <div className="bg-white dark:bg-[#161616] p-8 rounded-xl shadow-lg">
                  <motion.h2 className="text-2xl font-semibold mb-6" variants={itemVariants}>
                    Send me a message
                  </motion.h2>
                  
                  {formSubmitted ? (
                    <motion.div 
                      className="text-center py-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message sent successfully!</h3>
                      <p className="text-muted-foreground mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setFormSubmitted(false)}
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <motion.div className="mb-5" variants={itemVariants}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          {...form.register("name")}
                          className={form.formState.errors.name ? "border-red-500" : ""}
                        />
                        {form.formState.errors.name && (
                          <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                        )}
                      </motion.div>
                      
                      <motion.div className="mb-5" variants={itemVariants}>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...form.register("email")}
                          className={form.formState.errors.email ? "border-red-500" : ""}
                        />
                        {form.formState.errors.email && (
                          <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                      </motion.div>
                      
                      <motion.div className="mb-5" variants={itemVariants}>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="Project inquiry..."
                          {...form.register("subject")}
                          className={form.formState.errors.subject ? "border-red-500" : ""}
                        />
                        {form.formState.errors.subject && (
                          <p className="mt-1 text-sm text-red-500">{form.formState.errors.subject.message}</p>
                        )}
                      </motion.div>
                      
                      <motion.div className="mb-5" variants={itemVariants}>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium">
                          Your Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="I'd like to discuss a project..."
                          rows={5}
                          {...form.register("message")}
                          className={form.formState.errors.message ? "border-red-500" : ""}
                        />
                        {form.formState.errors.message && (
                          <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <MagneticButton asChild>
                          <Button type="submit" className="w-full flex items-center justify-center gap-2" size="lg" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5" />
                                <span>Send Message</span>
                              </>
                            )}
                          </Button>
                        </MagneticButton>
                      </motion.div>
                    </form>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-2 order-1 lg:order-2"
                ref={(el) => {
                  // Assign to both refs
                  if (el) {
                    // @ts-ignore - This is fine for DOM refs
                    contactInfoRef.current = el;
                    // @ts-ignore
                    contactInfoSectionRef.current = el;
                  }
                }}
                style={contactInfoStyle}
                initial="hidden"
                animate={contactInfoInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.div className="bg-muted/50 dark:bg-muted/10 p-8 rounded-xl" variants={itemVariants}>
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <a href="mailto:ruturajsolanki43@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                          ruturajsolanki43@gmail.com
                        </a>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <a href="tel:+919512373608" className="text-muted-foreground hover:text-primary transition-colors">
                          +91 95123 73608
                        </a>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          Gujarat, India
                        </p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-muted">
                    <h3 className="font-medium mb-4">Connect with Me</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://github.com/ruturajsolanki" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white dark:bg-[#161616] rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.582 9.5 21.27 9.5 21C9.5 20.761 9.492 20.049 9.489 19.159C6.92 19.792 6.35 17.681 6.35 17.681C5.902 16.45 5.258 16.139 5.258 16.139C4.36 15.495 5.329 15.507 5.329 15.507C6.33 15.577 6.857 16.566 6.857 16.566C7.752 18.12 9.255 17.727 9.518 17.469C9.611 16.81 9.878 16.417 10.173 16.2C8.116 15.98 5.947 15.081 5.947 11.234C5.947 10.11 6.34 9.194 6.878 8.481C6.773 8.23 6.424 7.197 7.016 5.902C7.016 5.902 7.823 5.628 9.475 6.839C10.27 6.615 11.119 6.503 11.964 6.499C12.806 6.503 13.657 6.615 14.454 6.839C16.104 5.628 16.91 5.902 16.91 5.902C17.504 7.197 17.155 8.23 17.05 8.481C17.59 9.194 17.98 10.11 17.98 11.234C17.98 15.093 15.807 15.976 13.74 16.191C14.112 16.461 14.447 17.001 14.447 17.823C14.447 19.001 14.436 20.671 14.436 21C14.436 21.274 14.594 21.589 15.105 21.488C19.075 20.162 21.937 16.417 21.937 12C21.937 6.477 17.461 2 12 2" fill="currentColor"/></svg>
                      </a>
                      <a 
                        href="https://linkedin.com/in/ruturajsolanki" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white dark:bg-[#161616] rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 11.888 14.671 11.802 14.505 11.802C14.34 11.802 13.372 11.845 13.372 13.174C13.372 13.344 13.372 17 13.372 17H10.999V10H13.372V11.013C13.746 10.443 14.562 10 16.025 10C17.488 10 18 11.801 18 13.174V17Z" fill="currentColor"/></svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}