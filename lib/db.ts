import { supabase } from './supabase';

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('completed_date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('completed_date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

// Skills
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category');
  
  if (error) throw error;
  return data;
}

// Experience
export async function getExperience() {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Education
export async function getEducation() {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('year', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Certificates
export async function getCertificates() {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Contact Messages
export async function saveContactMessage(message: {
  fullname: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ ...message, created_at: new Date().toISOString() }]);
  
  if (error) throw error;
  return data;
}
