import { useState, useEffect } from 'react';
import { FiBox, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { fetchProducts, MOCK_PRODUCTS } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts().then(d => setProducts(d.products));
    // Admin reads ALL orders from the global allOrders store
    setOrders(JSON.parse(localStorage.getItem('allOrders') || '[]'));
  }, []);

  if (!user || !user.isAdmin) return <Navigate to="/login" />;

  const stats = [
    { label: 'Total Sales', value: '$' + orders.reduce((a, o) => a + o.totalPrice, 0).toFixed(2), icon: FiDollarSign, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/15', text: 'text-purple-400' },
    { label: 'Orders', value: orders.length, icon: FiShoppingBag, color: 'from-pink-500/20 to-orange-500/20', border: 'border-pink-500/15', text: 'text-pink-400' },
    { label: 'Products', value: products.length, icon: FiBox, color: 'from-orange-500/20 to-yellow-500/20', border: 'border-orange-500/15', text: 'text-orange-400' },
    { label: 'Users', value: 24, icon: FiUsers, color: 'from-teal-500/20 to-purple-500/20', border: 'border-teal-500/15', text: 'text-teal-400' }
  ];

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted');
    }
  };

  const handleStatusChange = (orderId, status) => {
    const updated = orders.map(o => o._id === orderId ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('allOrders', JSON.stringify(updated));
    toast.success(`Order updated to ${status}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Admin <span className="gradient-text">Dashboard</span></h1>
          <p className="text-white/40 mt-1">Manage your store</p>
        </div>
        <span className="px-4 py-2 rounded-xl bg-yellow-400/10 text-yellow-400 font-bold text-sm border border-yellow-400/20">⭐ ADMIN MODE</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={s.label} className={`relative overflow-hidden glass-card p-5 border ${s.border} hover:scale-[1.02] transition-all duration-300`} style={{ animation: `slideUp 0.5s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1) forwards`, opacity: 0 }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`}></div>
            <div className="relative">
              <s.icon size={24} className={`mb-2 ${s.text} opacity-60`} />
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              <div className="text-[10px] mt-2 flex items-center gap-1 text-green-400/60"><FiTrendingUp size={10} /> +12% this month</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/5 pb-px">
        {['overview', 'products', 'orders'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 font-semibold capitalize transition-all text-sm rounded-t-lg ${tab === t ? 'text-purple-400 bg-white/5 border-b-2 border-purple-500' : 'text-white/30 hover:text-white/50'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5 border border-white/5">
            <h3 className="font-bold text-white/70 mb-4 text-sm">Recent Orders</h3>
            {orders.slice(0, 5).map(o => (
              <div key={o._id} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                <div>
                  <div className="font-semibold text-xs text-white/60">{o._id}</div>
                  <div className="text-[10px] text-white/25">{new Date(o.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="font-bold text-sm gradient-text">${o.totalPrice.toFixed(2)}</div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-sm text-white/25">No orders yet</p>}
          </div>
          <div className="glass-card p-5 border border-white/5">
            <h3 className="font-bold text-white/70 mb-4 text-sm">Top Categories</h3>
            {['Electronics', 'Fashion', 'Home', 'Sports'].map((c, i) => (
              <div key={c} className="mb-3.5">
                <div className="flex justify-between text-xs mb-1.5"><span className="font-semibold text-white/50">{c}</span><span className="text-white/30">{[35, 25, 22, 18][i]}%</span></div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000" style={{ width: [35, 25, 22, 18][i] + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'products' && (
        <div className="glass-card border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-white/70 text-sm">Products ({products.length})</h3>
            <button className="btn-primary text-xs py-2 flex items-center gap-1"><FiPlus size={14} /> Add Product</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] text-white/30 uppercase tracking-wider bg-white/[0.02]">
                  <th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Rating</th><th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 12).map(p => (
                  <tr key={p._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img src={p.image} className="w-9 h-9 rounded-lg object-cover border border-white/5" alt="" />
                      <span className="font-semibold text-xs text-white/60 line-clamp-1">{p.name}</span>
                    </td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-semibold">{p.category}</span></td>
                    <td className="p-3 font-bold text-sm text-white/70">${p.price}</td>
                    <td className="p-3"><span className={`text-xs font-semibold ${p.countInStock < 10 ? 'text-red-400' : 'text-green-400'}`}>{p.countInStock}</span></td>
                    <td className="p-3 text-xs text-white/40">⭐ {p.rating}</td>
                    <td className="p-3">
                      <button className="p-1.5 rounded text-blue-400/50 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><FiEdit2 size={13} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all"><FiTrash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="glass-card border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h3 className="font-bold text-white/70 text-sm">All Orders ({orders.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] text-white/30 uppercase tracking-wider bg-white/[0.02]">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={9} className="p-8 text-center text-white/25">No orders yet</td></tr>
                ) : orders.map(o => (
                  <tr key={o._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 font-mono text-[10px] text-white/40 whitespace-nowrap">{o._id}</td>
                    <td className="p-3">
                      <div className="font-semibold text-xs text-white/70">{o.userName || '—'}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs text-purple-400/80">{o.userEmail || '—'}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs text-teal-400/80 whitespace-nowrap">{o.userPhone || '—'}</div>
                    </td>
                    <td className="p-3 text-xs text-white/40 whitespace-nowrap">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-xs text-white/40">{o.orderItems.length} items</td>
                    <td className="p-3 font-bold text-sm gradient-text">${o.totalPrice.toFixed(2)}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-semibold">{o.status}</span></td>
                    <td className="p-3">
                      <select value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)} className="text-[10px] px-2 py-1 rounded border border-white/10 bg-white/5 text-white/60">
                        <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
