import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await register(form.name, form.email, form.password); navigate('/'); }
    catch {} finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 page-enter">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>
      </div>
      <div className="w-full max-w-md relative">
        <div className="glass-card overflow-hidden border border-white/5">
          <div className="relative bg-gradient-to-br from-orange-500/30 via-pink-500/25 to-purple-600/30 p-8 text-center overflow-hidden">
            <div className="relative">
              <h1 className="text-3xl font-display font-bold text-white">Join I-WAY Shopee</h1>
              <p className="text-white/50 mt-1">Create your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/60">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/50" />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/60">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/50" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/60">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/50" />
                <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
              {loading ? '⏳ Creating...' : <><FiUserPlus /> Create Account</>}
            </button>
            <p className="text-center text-sm text-white/40">
              Already have an account? <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
