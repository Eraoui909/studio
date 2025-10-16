import type { BlogPost, Experience, Project, Service } from "@/lib/types";
import { Code, PenTool, Server, Github, Linkedin, Mail } from "lucide-react";

export const personalData = {
  name: "Hamza Eraoui",
  tagline: "Building tools and stories, one commit at a time.",
  bio: "A creative problem-solver and software engineer passionate about building beautiful, functional, and user-centered applications. I thrive at the intersection of technology, design, and storytelling, transforming complex ideas into elegant realities.",
  contact: {
    email: "hamza@eraoui.dev",
    social: [
      { name: "GitHub", url: "https://github.com/hamza", icon: Github },
      { name: "LinkedIn", url: "https://linkedin.com/in/hamza", icon: Linkedin },
      { name: "Email", url: "mailto:hamza@eraoui.dev", icon: Mail },
    ],
  },
  resumeUrl: "/resume.pdf",
};

export const projects: Project[] = [
  {
    title: "Project Phoenix",
    description: "A full-stack web application for project management, built with Next.js, TypeScript, and a GraphQL API. Features real-time collaboration and a modern, responsive UI.",
    tags: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],
    image: "project1",
    githubUrl: "https://github.com/hamza/phoenix",
    liveUrl: "https://phoenix.eraoui.dev",
  },
  {
    title: "Java Developer Agent",
    description: "An AI-powered agent that assists developers with Java code generation, debugging, and optimization, streamlining the development workflow.",
    tags: ["AI", "GenAI", "Java", "Developer Tool"],
    image: "project5",
    githubUrl: "https://github.com/hamza/java-agent",
  },
  {
    title: "CodeCraft IDE",
    description: "An open-source, lightweight code editor extension for VSCode designed to streamline frontend development with custom snippets and theming.",
    tags: ["VSCode Extension", "TypeScript", "Webviews"],
    image: "project2",
    githubUrl: "https://github.com/hamza/codecraft",
  },
  {
    title: "ConnectSphere App",
    description: "A cross-platform mobile app for local community engagement, built using React Native. Focuses on intuitive UX and offline-first functionality.",
    tags: ["React Native", "Firebase", "UX/UI Design"],
    image: "project3",
    githubUrl: "https://github.com/hamza/connectsphere",
  },
  {
    title: "QuantumLeap.js",
    description: "An experimental JavaScript library for creating declarative, physics-based animations on the web. Explores the art of software and motion design.",
    tags: ["JavaScript", "Animation", "Library", "Open Source"],
    image: "project4",
    githubUrl: "https://github.com/hamza/quantumleap",
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "The Art of System Design: A Primer for Engineers",
    description: "Exploring the foundational principles of designing scalable and resilient software systems. From monoliths to microservices, we cover the essentials.",
    date: "July 15, 2024",
    slug: "art-of-system-design",
    content: "This is a placeholder for a full blog post about system design. System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. System design could be seen as the application of systems theory to product development. There is some overlap with the disciplines of systems analysis, systems architecture and systems engineering.",
    views: 2840,
    likes: 150,
  },
  {
    title: "My Journey into Open Source",
    description: "A personal reflection on contributing to open source, the challenges I faced, and the lessons learned along the way. It's more than just code.",
    date: "June 02, 2024",
    slug: "journey-into-open-source",
    content: "This is a placeholder for a full blog post about my journey into open source. It all started with a small bug I found in a library I was using. I was nervous to submit a pull request, but the maintainers were friendly and helpful. Since then, I've contributed to several projects and even started my own.",
    views: 1230,
    likes: 98,
  },
  {
    title: "State Management in Modern React: A Deep Dive",
    description: "Comparing and contrasting various state management libraries and patterns in the React ecosystem, including Context, Redux, and Zustand.",
    date: "May 21, 2024",
    slug: "state-management-react",
    content: "This is a placeholder for a full blog post about React state management. There are many ways to manage state in a React application. In this post, we'll explore some of the most popular options, including the built-in Context API, Redux, and Zustand. We'll look at the pros and cons of each and help you decide which one is right for your next project.",
    views: 4501,
    likes: 320,
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
