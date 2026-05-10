import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    const orders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    const order = orders.find(o => o._id === orderId.trim());
    
    if (order) {
      navigate(`/order/${order._id}`);
    } else {
      toast.error('Order not found! Please check your ID.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 page-enter text-center">
      <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
        <FiPackage size={40} />
      </div>
      
      <h1 className="text-4xl font-display font-bold text-white mb-4">Track Your <span className="gradient-text">Order</span></h1>
      <p className="text-white/50 mb-10">Enter your order ID below to check its current status.</p>

      <form onSubmit={handleTrack} className="glass-card p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="relative">
          <div className="mb-6">
            <label className="block text-left text-sm font-semibold mb-2 text-white/60">Order ID</label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/50" />
              <input 
                type="text" 
                value={orderId} 
                onChange={(e) => setOrderId(e.target.value)} 
                placeholder="e.g. ORD-1234567890" 
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5">Track Order</button>
        </div>
      </form>
    </div>
  );
};

export default TrackOrderPage;
