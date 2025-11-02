
import type { Experience, Project, Service, SkillCategory } from "@/lib/types";
import { Code, Server, Github, Linkedin, Mail, Globe, BrainCircuit } from "lucide-react";

export const personalData = {
  name: "Hamza Eraoui",
  tagline: "Software Engineer",
  bio: "I build pixel-perfect, engaging, and accessible digital experiences. As a software engineer, I specialize in creating robust and scalable web applications. My passion lies in solving complex problems and turning ideas into reality through code.",
  contact: {
    email: "hamzaeraoui2000@gmail.com",
    social: [
      { name: "GitHub", url: "https://github.com/Eraoui909", icon: Github },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/hamza-eraoui/", icon: Linkedin },
      { name: "Email", url: "mailto:hamzaeraoui2000@gmail.com", icon: Mail },
      { name: "Website", url: "https://hamzaeraoui.com", icon: Globe }
    ],
  },
  resumeUrl: "/resume",
};

export const skills: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "Bash", "SQL", "PL/SQL"],
  },
  {
    title: "AI & Machine Learning",
    items: ["Model Context Protocol (MCP)", "LangChain", "Transformers", "NLP"],
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "Docker", "Jenkins", "GitLab CI", "Maven", "Liquibase", "Jira", "Confluence", "GitHub"],
  },
  {
    title: "Cloud & Databases",
    items: ["Oracle Cloud Infrastructure (OCI)", "Oracle Database"],
  },
];

export const hobbies = ["Billiards", "Chess", "Football"];

export const projects: Project[] = [
  {
    title: "SQLcl MCP Server",
    description: "Implemented a secure MCP Server using the MCP Java SDK to enable LLM access to Oracle Databases, improving developer productivity by 30% and achieving broad adoption among Oracle users.",
    tags: ["Java", "MCP", "Oracle", "SQL"],
    image: "project5",
    liveUrl: "https://medium.com/@hamza.eraoui/sqlcl-mcp-server-tips-tricks-and-use-cases-d9e3f533a41e",
    problem: "There was no secure or standardized way for Large Language Models to interact with Oracle Databases, limiting the potential for AI-driven database management.",
    contribution: "I implemented a secure MCP Server from the ground up using the Java SDK. This enabled LLMs to safely access Oracle databases, which improved developer productivity by 30% and led to broad adoption among Oracle users.",
  },
  {
    title: "Database Package Manager",
    description: "Developed the first package manager in the database ecosystem, enabling full lifecycle management of SQL and PL/SQL applications through a state-of-the-art architecture that securely isolates and deploys third-party dependencies within the database.",
    tags: ["SQL", "PL/SQL", "Architecture", "DevOps"],
    image: "project1",
    problem: "The database ecosystem lacked a package manager, making it difficult to manage dependencies and application lifecycles for SQL and PL/SQL.",
    contribution: "I designed and developed the first-ever package manager for the database ecosystem. This involved creating a state-of-the-art architecture for secure dependency isolation and deployment.",
  },
  {
    title: "Smol AI Developer",
    description: "Developed an AI agent that acts as a Junior Java Developer within a large-scale codebase, performing code reviews and generating unit and integration tests to achieve 80% code coverage. Automated repetitive development tasks using Java, OpenAI SDK, and Maven.",
    tags: ["AI", "Java", "OpenAI", "Maven"],
    image: "project2",
    githubUrl: "https://github.com/Eraoui909/smol-ai-developer",
    problem: "Repetitive development tasks like code reviews and writing basic tests were time-consuming. The goal was to automate these to increase efficiency and code coverage.",
    contribution: "I developed an AI agent that functions as a junior Java developer. It automates code reviews and generates tests to achieve 80% coverage, using Java, the OpenAI SDK, and Maven.",
  },
];

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Oracle",
    period: "Feb 2023 - Present",
    description: "Implemented a Model Context Protocol (MCP) Server using Java SDK, enabling Oracle database access via Large Language Models. Increased test code coverage by 80% and designed a new database development framework, resulting in a granted patent. Led collaboration across 3 teams for our new framework and mentored 4 interns who became full-time engineers.",
  },
  {
    role: "Master of data science and intelligent systems",
    company: "Faculty of Science and Technologies",
    period: "2021 - 2023",
    description: "Focused on advanced topics in data science and artificial intelligence, including machine learning, natural language processing, and system design.",
  },
  {
    role: "Bachelor of Computer Science",
    company: "Faculty of Science and Technologies",
    period: "2018 - 2021",
    description: "Gained a strong foundation in computer science fundamentals, including algorithms, data structures, and software engineering principles.",
  },
];

export const services: Service[] = [
  {
    title: "Software Development",
    description: "End-to-end development of web and mobile applications, from ideation and architecture to deployment and maintenance.",
    icon: Code,
  },
  {
    title: "AI Agent & MCP Development",
    description: "Building intelligent AI agents and robust MCP servers to interact with your data and services, enabling advanced automation.",
    icon: BrainCircuit,
  },
  {
    title: "Low-Code/No-Code Development",
    description: "Consulting and development services for Low-Code/No-Code platforms, with a special focus on Oracle APEX.",
    icon: Server,
  },
];
