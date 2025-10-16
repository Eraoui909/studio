import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  slug: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};
