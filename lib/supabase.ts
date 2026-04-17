import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for database tables
export interface Project {
  id: string
  title: string
  description: string
  url: string
  image: string
  technologies: string[]
  category: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  author: string
  content: string
  role: string
  image: string
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  message: string
  phone?: string
  created_at: string
  status: 'new' | 'contacted' | 'closed'
}

export interface AdminSettings {
  id: string
  admin_password_hash: string
  last_login: string
  total_logins: number
  created_at: string
  updated_at: string
}
