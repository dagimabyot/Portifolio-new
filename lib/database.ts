import { supabase, Project, Testimonial, Lead } from './supabase'

// Projects
export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching projects:', error)
    return []
  }

  return data || []
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching featured projects:', error)
    return []
  }

  return data || []
}

export async function addProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error adding project:', error)
    return null
  }

  return data
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[v0] Error updating project:', error)
    return null
  }

  return data
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    console.error('[v0] Error deleting project:', error)
    return false
  }

  return true
}

// Testimonials
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching testimonials:', error)
    return []
  }

  return data || []
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial | null> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error adding testimonial:', error)
    return null
  }

  return data
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    console.error('[v0] Error deleting testimonial:', error)
    return false
  }

  return true
}

// Leads
export async function fetchLeads(): Promise<Lead[]> {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching leads:', error)
    return []
  }

  return data || []
}

export async function addLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ ...lead, status: 'new' }])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error adding lead:', error)
    return null
  }

  return data
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<Lead | null> {
  const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select().single()

  if (error) {
    console.error('[v0] Error updating lead status:', error)
    return null
  }

  return data
}

export async function deleteLead(id: string): Promise<boolean> {
  const { error } = await supabase.from('leads').delete().eq('id', id)

  if (error) {
    console.error('[v0] Error deleting lead:', error)
    return false
  }

  return true
}
