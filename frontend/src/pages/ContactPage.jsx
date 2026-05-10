import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you shortly.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 page-enter">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Get in <span className="gradient-text">Touch</span></h1>
        <p className="text-white/50 text-lg">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
        <div className="space-y-6">
          <div className="glass-card p-6 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <FiMapPin size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">Our HQ</h3>
            <p className="text-white/40 text-sm leading-relaxed">123 Commerce Avenue<br />Tech District, Innovation City<br />NY 10001, USA</p>
          </div>
          <div className="glass-card p-6 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4">
              <FiMail size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">Email Us</h3>
            <p className="text-white/40 text-sm">support@iwayshopee.com<br />contact@iwayshopee.com</p>
          </div>
          <div className="glass-card p-6 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
              <FiPhone size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">Call Us</h3>
            <p className="text-white/40 text-sm">+1 (800) 123-4567<br />Mon-Fri 9am to 6pm EST</p>
          </div>
        </div>

        <div className="glass-card p-8 border border-white/5">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/60">Your Name</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/60">Your Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/60">Subject</label>
              <input required type="text" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/60">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all resize-none" placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 mt-4">
              <FiSend /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
