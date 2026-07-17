import { Project, Testimonial, Lead, PortfolioData } from '../types';

// Base URL of the Django backend. Configure via VITE_API_URL in .env (see .env.example).
const API_URL: string = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000/api';

const TOKEN_KEY = 'portfolio_admin_token';

export const authStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
  isAuthenticated: (): boolean => !!localStorage.getItem(TOKEN_KEY),
};

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth, headers, ...rest } = options;
  const finalHeaders: Record<string, string> = {
    ...(headers as Record<string, string> | undefined),
  };

  if (!(rest.body instanceof FormData)) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = authStorage.getToken();
    if (token) {
      finalHeaders['Authorization'] = `Token ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${path}`, { ...rest, headers: finalHeaders });

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const message = (data && (data.detail || JSON.stringify(data))) || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}

// ---- Auth ----
export const authApi = {
  login: (username: string, password: string) =>
    request<{ token: string; username: string }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<void>('/auth/logout/', { method: 'POST', auth: true }),
  me: () => request<{ username: string; email: string }>('/auth/me/', { auth: true }),
};

// ---- Projects ----
function fromApiProject(p: any): Project {
  return { ...p, id: String(p.id) };
}

export const projectsApi = {
  list: async (): Promise<Project[]> => {
    const data = await request<{ results: any[] } | any[]>('/projects/?page_size=100');
    const results = Array.isArray(data) ? data : data.results;
    return results.map(fromApiProject);
  },
  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const created = await request<any>('/projects/', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(project),
    });
    return fromApiProject(created);
  },
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const updated = await request<any>(`/projects/${id}/`, {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify(project),
    });
    return fromApiProject(updated);
  },
  remove: (id: string): Promise<void> =>
    request<void>(`/projects/${id}/`, { method: 'DELETE', auth: true }),
};

// ---- Testimonials ----
export const testimonialsApi = {
  list: async (): Promise<Testimonial[]> => {
    const data = await request<{ results: any[] } | any[]>('/testimonials/?page_size=100');
    const results = Array.isArray(data) ? data : data.results;
    return results.map((t: any) => ({ ...t, id: String(t.id) }));
  },
};

// ---- Leads (contact form) ----
export const leadsApi = {
  submit: async (lead: { name: string; email: string; subject: string; message: string }): Promise<Lead> => {
    const created = await request<any>('/leads/', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
    return { ...created, id: String(created.id) };
  },
  list: async (): Promise<Lead[]> => {
    const data = await request<{ results: any[] } | any[]>('/leads/?page_size=100', { auth: true });
    const results = Array.isArray(data) ? data : data.results;
    return results.map((l: any) => ({ ...l, id: String(l.id) }));
  },
  markRead: (id: string): Promise<Lead> =>
    request<any>(`/leads/${id}/`, {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify({ read: true }),
    }),
};

// ---- Site settings ----
export const settingsApi = {
  get: () => request<PortfolioData['settings']>('/settings/'),
  update: (settings: PortfolioData['settings']) =>
    request<PortfolioData['settings']>('/settings/', {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(settings),
    }),
};

// ---- Aggregate loader used by App on startup ----
export async function loadPortfolioData(): Promise<Omit<PortfolioData, 'leads'>> {
  const [projects, testimonials, settings] = await Promise.all([
    projectsApi.list(),
    testimonialsApi.list(),
    settingsApi.get(),
  ]);
  return { projects, testimonials, settings };
}
