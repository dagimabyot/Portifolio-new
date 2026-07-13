'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

const contactSchema = z.object({
  fullname: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle');
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ ...data, created_at: new Date().toISOString() }]);
      
      if (error) throw error;
      
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-foreground/80">
              Have a project in mind? Let&apos;s discuss how I can help you bring it to life.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Contact Info Cards */}
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <a href="mailto:dagim045@gmail.com" className="text-accent hover:text-accent-dark">
                  dagim045@gmail.com
                </a>
              </div>
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-bold mb-2">Phone</h3>
                <a href="tel:+251977078336" className="text-accent hover:text-accent-dark">
                  +251 977078336
                </a>
              </div>
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className="text-foreground/70">Addis Ababa, Ethiopia</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-foreground/80 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register('fullname')}
                    className="w-full px-4 py-3 bg-card rounded-lg border border-accent/20 focus:border-accent focus:outline-none text-foreground placeholder-foreground/50 transition-colors"
                  />
                  {errors.fullname && (
                    <p className="text-error text-sm mt-1">{errors.fullname.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-foreground/80 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    className="w-full px-4 py-3 bg-card rounded-lg border border-accent/20 focus:border-accent focus:outline-none text-foreground placeholder-foreground/50 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-foreground/80 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Project inquiry"
                    {...register('subject')}
                    className="w-full px-4 py-3 bg-card rounded-lg border border-accent/20 focus:border-accent focus:outline-none text-foreground placeholder-foreground/50 transition-colors"
                  />
                  {errors.subject && (
                    <p className="text-error text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-foreground/80 font-medium mb-2">Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={6}
                    {...register('message')}
                    className="w-full px-4 py-3 bg-card rounded-lg border border-accent/20 focus:border-accent focus:outline-none text-foreground placeholder-foreground/50 transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-error text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-success/20 border border-success text-success rounded-lg">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-error/20 border border-error text-error rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
