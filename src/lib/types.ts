
import type { LucideIcon } from "lucide-react";
import { z } from "zod";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  logo?: string;
  problem?: string;
  contribution?: string;
  stars?: number;
  forks?: number;
};

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  views?: number;
  likes?: number;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description:string;
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ContactFormInputSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required."),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export type SkillCategory = {
  title: string;
  items: string[];
};

export type ArchiveItem = {
  title: string;
  description: string;
  url: string;
  tags: string[];
};
