'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  fullname: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const message = messages.find(m => m.id === id);
      if (!message) return;

      await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !message.read }),
      });

      setMessages(messages.map(m =>
        m.id === id ? { ...m, read: !m.read } : m
      ));
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;

    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
      setSelectedMessage(null);
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-foreground/70">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">No messages yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-2">
              {messages.map((msg, index) => (
                <motion.button
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedMessage?.id === msg.id
                      ? 'bg-accent/20 border border-accent'
                      : `glass ${!msg.read ? 'border-l-4 border-accent' : ''}`
                  }`}
                >
                  <p className={`font-semibold ${!msg.read ? 'text-white' : 'text-foreground/80'}`}>
                    {msg.fullname}
                  </p>
                  <p className="text-sm text-foreground/60 truncate">{msg.subject}</p>
                  <p className="text-xs text-foreground/50 mt-1">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Message Detail */}
            {selectedMessage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 glass rounded-lg p-6"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject}</h2>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-foreground/70">From: {selectedMessage.fullname}</p>
                      <p className="text-foreground/70">{selectedMessage.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                          selectedMessage.read
                            ? 'bg-foreground/10 text-foreground/70'
                            : 'bg-accent/10 text-accent'
                        }`}
                      >
                        {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-sm font-semibold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground/80 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-accent/10 text-sm text-foreground/50">
                  Received: {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
