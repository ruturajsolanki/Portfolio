import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award } from "lucide-react";

const certifications = [
  {
    title: "TCS CodeVita",
    issuer: "TCS",
    link: "https://drive.google.com/file/d/1EQmNo0HKZUIyrvnli4hvzwxoXfoVVbt1/view"
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Ruturaj-Solanki/responsive-web-design"
  },
  {
    title: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Ruturaj-Solanki/scientific-computing-with-python-v7"
  },
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Ruturaj-Solanki/data-analysis-with-python-v7"
  },
  {
    title: "Google Cloud Cybersecurity",
    issuer: "Google Cloud",
    link: "https://drive.google.com/drive/folders/1O7LysibHhhrYXUxJ-ryafnqk4hSs73Sq?usp=sharing"
  },
  {
    title: "Google Analytics",
    issuer: "Google",
    link: "https://skillshop.exceedlms.com/student/award/VTqbL1PSwZZxLT8EGvjQ7XzN"
  },
  {
    title: "Forage Certificate",
    issuer: "Forage",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_tMae5XJE5H3dsYg6f_1734592926993_completion_certificate.pdf"
  },
  {
    title: "Letter of Appreciation",
    issuer: "TCS",
    link: "https://drive.google.com/file/d/15w1ac8kZnzoxOL6iUS3qVcfCXA8OI4CE/view?usp=sharing"
  }
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Certifications & <span className="text-primary">Achievements</span>
              </h1>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                A collection of my professional certifications and notable achievements that showcase my expertise and dedication to continuous learning.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#161616] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-primary hover:underline"
                  >
                    View Certificate →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 