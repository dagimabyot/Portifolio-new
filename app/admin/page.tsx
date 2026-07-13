'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/console');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/console');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="mt-4 text-foreground/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-foreground/60 text-sm">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-error/10 hover:bg-error/20 text-error rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-accent/10 pb-4">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'projects', label: 'Projects', icon: '📁' },
            { id: 'skills', label: 'Skills', icon: '⚡' },
            { id: 'experience', label: 'Experience', icon: '💼' },
            { id: 'messages', label: 'Messages', icon: '💬' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'bg-card hover:bg-card-hover text-foreground/80'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: '50+' },
                { label: 'Total Skills', value: '25+' },
                { label: 'Messages', value: '12' },
                { label: 'Page Views', value: '5.2k' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-lg p-6">
                  <p className="text-foreground/60 text-sm mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-accent">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/admin/projects/new"
                  className="p-6 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-center font-semibold text-accent transition-all"
                >
                  + Add New Project
                </Link>
                <Link
                  href="/admin/projects"
                  className="p-6 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-center font-semibold text-accent transition-all"
                >
                  Manage Projects
                </Link>
                <Link
                  href="/admin/messages"
                  className="p-6 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-center font-semibold text-accent transition-all"
                >
                  View Messages
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects Management</h2>
              <Link
                href="/admin/projects/new"
                className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-all"
              >
                + Add Project
              </Link>
            </div>
            <div className="glass rounded-lg p-8">
              <p className="text-foreground/70">Projects management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Skills Management</h2>
              <button className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-all">
                + Add Skill
              </button>
            </div>
            <div className="glass rounded-lg p-8">
              <p className="text-foreground/70">Skills management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Experience Management</h2>
              <button className="px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-all">
                + Add Experience
              </button>
            </div>
            <div className="glass rounded-lg p-8">
              <p className="text-foreground/70">Experience management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <div className="glass rounded-lg p-8">
              <p className="text-foreground/70">Messages management interface coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
