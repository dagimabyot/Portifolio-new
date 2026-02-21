
export enum ProjectCategory {
  WEB = 'Web Development',
  MOBILE = 'Mobile App',
  DESIGN = 'UI/UX Design',
  AI = 'AI/ML'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  skills: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface PortfolioData {
  projects: Project[];
  testimonials: Testimonial[];
  leads: Lead[];
  settings: {
    name: string;
    brandName: string;
    bio: string;
    heroHeadline: string;
    heroSubline: string;
    email: string;
    phone?: string;
    socials: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    }
  }
}
