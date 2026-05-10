import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email, password); navigate(redirect); }
    catch {} finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 page-enter">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="glass-card overflow-hidden border border-white/5">
          <div className="relative bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-orange-500/20 p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl mx-auto mb-3 flex items-center justify-center text-3xl font-black text-white border border-white/10 shadow-lg animate-float">I</div>
              <h1 className="text-3xl font-display font-bold text-white">Welcome Back!</h1>
              <p className="text-white/50 mt-1">Login to continue shopping</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-white/60">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/50" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-white/60">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/50" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
              {loading ? '⏳ Logging in...' : <><FiLogIn /> Login</>}
            </button>
            <div className="mt-4 p-3.5 bg-white/[0.03] rounded-xl text-[11px] text-center text-white/30 border border-white/5">
              <strong className="text-white/50">Demo Admin:</strong> admin@iwayshopee.com / admin123<br />
              <strong className="text-white/50">Demo User:</strong> Any email + password (6+ chars)
            </div>
            <p className="text-center mt-4 text-sm text-white/40">
              New here? <Link to="/register" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
