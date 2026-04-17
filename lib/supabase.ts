import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lpagvvoqwbsbzaabeabk.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYWd2dm9nd2JzYnphYWJlYWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTY2MjcsImV4cCI6MjA5MTk3MjYyN30.itXd6wI8On5s4KzX63SWB_4nuccShsjR864e-S6DMkE'

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not configured')
}

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
