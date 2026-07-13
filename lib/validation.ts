import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(1000),
  technologies: z.array(z.string()).min(1),
  images: z.array(z.string()).optional(),
  github_url: z.string().url().optional().or(z.literal('')),
  live_url: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  completed_date: z.string().optional(),
  role: z.string().optional(),
  key_features: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  results: z.string().optional(),
});

export const MessageSchema = z.object({
  fullname: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(3).max(255),
  message: z.string().min(10).max(5000),
});

export const SkillSchema = z.object({
  skill_name: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  percentage: z.number().min(0).max(100),
});

export const ExperienceSchema = z.object({
  company: z.string().min(2).max(255),
  role: z.string().min(2).max(255),
  description: z.string().min(10).max(1000),
  start_date: z.string(),
  end_date: z.string().optional(),
});

export const EducationSchema = z.object({
  institution: z.string().min(2).max(255),
  degree: z.string().min(2).max(255),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

export const CertificateSchema = z.object({
  title: z.string().min(2).max(255),
  issuer: z.string().min(2).max(255),
  image: z.string().url().optional(),
  date: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
