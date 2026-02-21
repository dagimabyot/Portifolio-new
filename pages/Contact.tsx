
import React, { useState } from 'react';
import { Lead } from '../types';

interface ContactProps {
  onContactSubmit: (lead: Lead) => void;
  data: { settings: { email: string } };
}

const Contact: React.FC<ContactProps> = ({ onContactSubmit, data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: Date.now().toString(),
      ...formData,
      timestamp: Date.now(),
      read: false
    };
    onContactSubmit(newLead);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-40 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-blue-600/20 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-blue-500/30">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">Transmission Sent.</h1>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed">
          Your message has been received. I'll get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl border border-slate-800 hover:border-blue-500 hover:text-blue-400 transition-all"
        >
          Send Another Update
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-4 block">Communication</span>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Initiate <br/><span className="text-blue-500">Contact.</span></h1>
          <p className="text-slate-400 text-lg lg:text-xl leading-relaxed mb-16 max-w-lg">
            Ready to bring your digital vision to life? Fill out the brief below, and let's start engineering excellence together.
          </p>

          <div className="space-y-12">
            <div className="flex items-start group">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mr-8 shrink-0 border border-slate-800 group-hover:border-blue-500 transition-colors">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1 uppercase tracking-wider">Email Me</h4>
                <p className="text-slate-500 text-lg group-hover:text-blue-400 transition-colors">{data.settings.email}</p>
              </div>
            </div>

            {data.settings.phone && (
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mr-8 shrink-0 border border-slate-800 group-hover:border-blue-500 transition-colors">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1 uppercase tracking-wider">Call Me</h4>
                  <p className="text-slate-500 text-lg group-hover:text-blue-400 transition-colors">{data.settings.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-slate-900/50 p-10 lg:p-14 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder:text-slate-700"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder:text-slate-700"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="Subject of inquiry"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder:text-slate-700"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Technical Brief</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none placeholder:text-slate-700"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-blue-600 text-white font-black text-lg uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all duration-300 shadow-2xl shadow-blue-900/40 transform active:scale-95"
              >
                Launch Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
