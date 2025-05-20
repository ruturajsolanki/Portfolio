export interface Project {
  id: number;
  title: string;
  image: string;
  tags: string[];
  description: string;
  features: string[];
  repo: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "CropItAgro",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "Agriculture", "Data Analysis"],
    description: "An agricultural solution using machine learning for crop recommendations and disease detection.",
    features: [
      "Crop recommendation based on soil and climate data",
      "Plant disease detection using image processing",
      "Weather forecasting integration",
      "Yield prediction algorithms",
      "User-friendly interface for farmers"
    ],
    repo: "https://github.com/ruturajsolanki/CropItAgro_OR.git",
    demo: "https://github.com/ruturajsolanki/CropItAgro_OR"
  },
  {
    id: 2,
    title: "Text Summarizer",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    tags: ["NLP", "Python", "Machine Learning", "Text Processing"],
    description: "An advanced text summarization tool using natural language processing techniques.",
    features: [
      "Extractive and abstractive summarization",
      "Multiple language support",
      "Customizable summary length",
      "API integration capabilities",
      "Batch processing support"
    ],
    repo: "https://github.com/ruturajsolanki/Text_Summarizer",
    demo: "https://github.com/ruturajsolanki/Text_Summarizer"
  },
  {
    id: 3,
    title: "RAG QA",
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    tags: ["AI", "NLP", "Python", "Question Answering"],
    description: "A Retrieval-Augmented Generation system for accurate question answering.",
    features: [
      "Context-aware question answering",
      "Document retrieval system",
      "Answer generation with citations",
      "Multiple document formats support",
      "Real-time processing"
    ],
    repo: "https://github.com/ruturajsolanki/RAG-QA",
    demo: "https://github.com/ruturajsolanki/RAG-QA"
  },
  {
    id: 4,
    title: "AI Voice Assistant",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Speech Recognition", "AI", "Natural Language Processing"],
    description: "An intelligent voice assistant capable of understanding and executing voice commands.",
    features: [
      "Voice command recognition",
      "Natural language understanding",
      "Task automation",
      "Custom command configuration",
      "Multi-language support"
    ],
    repo: "https://github.com/ruturajsolanki/AI-Voice-Assistant",
    demo: "https://github.com/ruturajsolanki/AI-Voice-Assistant"
  },
  {
    id: 5,
    title: "Portfolio Website Template",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    tags: ["HTML/CSS", "JavaScript", "GSAP", "Responsive Design"],
    description: "A modern, customizable portfolio website template for creative professionals with smooth animations and responsive design.",
    features: [
      "Interactive project showcase with filtering",
      "Smooth page transitions and animations",
      "Contact form with validation",
      "Blog section with markdown support",
      "Dark/light mode toggle"
    ],
    repo: "https://github.com/ruturajsolanki/portfolio-website-template",
    demo: "https://example.com"
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    tags: ["React Native", "Firebase", "HealthKit/Google Fit", "Redux"],
    description: "A mobile fitness tracking application for logging workouts, tracking nutrition, and visualizing progress over time.",
    features: [
      "Workout logging with customizable routines",
      "Nutrition tracking and meal planning",
      "Progress visualization and goal setting",
      "Integration with health platforms",
      "Social sharing and challenges"
    ],
    repo: "https://github.com/ruturajsolanki",
    demo: "https://example.com"
  }
];
