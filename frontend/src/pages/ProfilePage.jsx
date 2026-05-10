import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...user, ...form };
    localStorage.setItem('userInfo', JSON.stringify(updated));
    toast.success('Profile updated!');
  };

  if (!user) return <div className="text-center py-20 text-white/40">Please login</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 page-enter">
      <div className="relative overflow-hidden glass-card p-8 border border-purple-500/10 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-pink-500/10 to-orange-500/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="relative flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur flex items-center justify-center text-4xl font-bold text-white border border-white/10 shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">{user.name}</h1>
            <p className="text-white/40">{user.email}</p>
            {user.isAdmin && <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20">⭐ ADMIN</span>}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 border border-white/5 space-y-5">
        <h2 className="text-lg font-bold text-white/80 mb-1">Edit Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: FiUser, label: 'Name', key: 'name', type: 'text', placeholder: '' },
            { icon: FiMail, label: 'Email', key: 'email', type: 'email', placeholder: '' },
            { icon: FiPhone, label: 'Phone', key: 'phone', type: 'tel', placeholder: '+1 555 0000' },
            { icon: FiMapPin, label: 'Address', key: 'address', type: 'text', placeholder: 'Street, City' }
          ].map(field => (
            <div key={field.key}>
              <label className="block text-sm font-semibold mb-2 text-white/50 flex items-center gap-1.5">
                <field.icon size={13} /> {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all text-sm"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2 text-sm py-2.5"><FiSave /> Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
