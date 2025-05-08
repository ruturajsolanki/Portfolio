import { motion } from "framer-motion";
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

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-primary hover:underline"
                >
                  View Certificate →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 