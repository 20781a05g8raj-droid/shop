import { Link } from 'react-router-dom';
import { FiPackage, FiCheckCircle, FiClock, FiTruck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();

  // Only show orders belonging to the currently logged-in user
  const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
  const orders = allOrders.filter(
    o => o.userId === (user?._id || user?.email)
  );

  const statusConfig = {
    Pending: { color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20', icon: FiClock },
    Processing: { color: 'bg-blue-500/15 text-blue-400 border-blue-500/20', icon: FiPackage },
    Shipped: { color: 'bg-purple-500/15 text-purple-400 border-purple-500/20', icon: FiTruck },
    Delivered: { color: 'bg-green-500/15 text-green-400 border-green-500/20', icon: FiCheckCircle }
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center page-enter">
        <div className="text-7xl mb-5 animate-float">🔒</div>
        <h1 className="text-3xl font-bold text-white mb-2">Please login</h1>
        <p className="text-white/40 mb-8">You need to be logged in to view your orders</p>
        <Link to="/login" className="btn-primary inline-block px-8 py-3.5">Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center page-enter">
        <div className="text-7xl mb-5 animate-float">📦</div>
        <h1 className="text-3xl font-bold text-white mb-2">No orders yet</h1>
        <p className="text-white/40 mb-8">Start shopping to see your orders here</p>
        <Link to="/products" className="btn-primary inline-block px-8 py-3.5">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 page-enter">
      <h1 className="text-3xl font-display font-bold text-white mb-6">My <span className="gradient-text">Orders</span></h1>
      <div className="space-y-4">
        {orders.map((order, i) => {
          const SC = statusConfig[order.status] || statusConfig.Processing;
          return (
            <div key={order._id} className="glass-card p-5 border border-white/5 hover:border-purple-500/10 transition-all duration-300" style={{ animation: `slideUp 0.5s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1) forwards`, opacity: 0 }}>
              <div className="flex flex-wrap items-center justify-between mb-4 pb-4 border-b border-white/5 gap-3">
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider">Order Placed</div>
                  <div className="font-semibold text-sm text-white/70">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider">Total</div>
                  <div className="font-bold gradient-text">${order.totalPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider">Order ID</div>
                  <div className="font-mono text-xs font-semibold text-white/50">{order._id}</div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg ${SC.color} border flex items-center gap-1.5 text-xs font-semibold`}>
                  <SC.icon size={13} /> {order.status}
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
                <div className="flex gap-2 overflow-x-auto">
                  {order.orderItems.slice(0, 4).map(item => (
                    <img key={item._id || item.product} src={item.image} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-white/5" alt={item.name} />
                  ))}
                  {order.orderItems.length > 4 && (
                    <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 font-bold flex-shrink-0 text-sm border border-white/5">+{order.orderItems.length - 4}</div>
                  )}
                </div>
                <Link to={`/order/${order._id}`} className="btn-secondary whitespace-nowrap text-sm py-2">View Details</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
