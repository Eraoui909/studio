import type { Experience, Project, Service } from "@/lib/types";
import { Code, PenTool, Server, Github, Linkedin, Mail } from "lucide-react";

export const personalData = {
  name: "Hamza Eraoui",
  tagline: "Building tools and stories, one commit at a time.",
  bio: "A creative problem-solver and software engineer passionate about building beautiful, functional, and user-centered applications. I thrive at the intersection of technology, design, and storytelling, transforming complex ideas into elegant realities.",
  contact: {
    email: "hamzaeraoui2000@gmail.com",
    social: [
      { name: "GitHub", url: "https://github.com/Eraoui909", icon: Github },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/hamza-eraoui/", icon: Linkedin },
      { name: "Email", url: "mailto:hamzaeraoui2000@gmail.com", icon: Mail },
    ],
  },
  resumeUrl: "/resume",
};

export const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "GraphQL", "Docker", "System Design"];
export const hobbies = ["Reading Sci-Fi", "Playing Guitar", "Hiking", "Photography"];

export const projects: Project[] = [
  {
    title: "Project Phoenix",
    description: "A full-stack web application for project management, built with Next.js, TypeScript, and a GraphQL API. Features real-time collaboration and a modern, responsive UI.",
    tags: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],
    image: "project1",
    githubUrl: "https://github.com/Eraoui909/phoenix",
    liveUrl: "https://phoenix.eraoui.dev",
    logo: "/images/logos/phoenix-logo.svg",
    problem: "Teams struggled with scattered project data and poor collaboration. The goal was to centralize everything into one intuitive platform.",
    contribution: "As the lead architect, I designed the full-stack architecture, implemented the GraphQL API, and mentored the frontend team on React best practices. I also set up the CI/CD pipeline.",
    stars: 1200,
    forks: 345,
  },
  {
    title: "CodeCraft IDE",
    description: "An open-source, lightweight code editor extension for VSCode designed to streamline frontend development with custom snippets and theming.",
    tags: ["VSCode Extension", "TypeScript", "Webviews"],
    image: "project2",
    githubUrl: "https://github.com/Eraoui909/codecraft",
    logo: "/images/logos/codecraft-logo.svg",
    problem: "Repetitive coding tasks and inconsistent theming were slowing down development. I wanted to create a tool to automate snippets and enforce a consistent look and feel.",
    contribution: "I developed the core extension using TypeScript and the VSCode API. A key challenge was creating a performant webview-based theme customizer, which I solved by optimizing the rendering process.",
    stars: 850,
    forks: 120,
  },
  {
    title: "QuantumLeap.js",
    description: "An experimental JavaScript library for creating declarative, physics-based animations on the web. Explores the art of software and motion design.",
    tags: ["JavaScript", "Animation", "Library", "Open Source"],
    image: "project4",
    githubUrl: "https://github.com/Eraoui909/quantumleap",
    logo: "/images/logos/quantumleap-logo.svg",
    problem: "Creating natural, physics-based web animations was often complex and verbose. QuantumLeap.js provides a simple, declarative API to make it accessible to more developers.",
    contribution: "I wrote the entire physics engine from scratch, focusing on performance and ease of use. I also authored the documentation and created a gallery of examples to showcase its capabilities.",
    stars: 2500,
    forks: 450,
  },
];

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Innovate Inc.",
    period: "2021 - Present",
    description: "Led the development of a high-traffic e-commerce platform, improving performance by 30%. Mentored junior developers and championed best practices in code quality and testing.",
  },
  {
    role: "Software Engineer",
    company: "Tech Solutions Co.",
    period: "2018 - 2021",
    description: "Developed and maintained several client-facing web applications using React and Node.js. Collaborated in an agile team to deliver features from concept to deployment.",
  },
  {
    role: "Junior Developer",
    company: "Code Wizards",
    period: "2016 - 2018",
    description: "Started my professional journey building responsive websites and learning the fundamentals of web development and software engineering principles.",
  },
  {
    role: "B.S. in Computer Science",
    company: "University of Technology",
    period: "2012 - 2016",
    description: "Graduated with honors, focusing on algorithms, data structures, and artificial intelligence. Active member of the university coding club.",
  },
];

export const services: Service[] = [
  {
    title: "Software Development",
    description: "End-to-end development of web and mobile applications, from ideation and architecture to deployment and maintenance.",
    icon: Code,
  },
  {
    title: "Technical Writing",
    description: "Crafting clear, concise, and comprehensive documentation, blog posts, and tutorials for developer audiences.",
    icon: PenTool,
  },
  {
    title: "System Design Consulting",
    description: "Advising on scalable, resilient, and cost-effective system architectures for modern applications.",
    icon: Server,
  },
];
