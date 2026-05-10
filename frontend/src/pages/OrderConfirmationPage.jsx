import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiShoppingBag, FiHome } from 'react-icons/fi';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
  const order = orders.find(o => o._id === id) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center page-enter">
        <h1 className="text-2xl font-bold text-white">Order not found</h1>
        <Link to="/" className="btn-primary mt-6 inline-block">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 page-enter">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400/20 to-teal-500/20 border border-green-500/20 text-green-400 mb-5 animate-scale-in shadow-lg shadow-green-500/10">
          <FiCheckCircle size={44} />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Order Confirmed! 🎉</h1>
        <p className="text-white/40">Thank you for shopping with I-WAY Shopee</p>
        <p className="text-sm text-white/30 mt-2">Order ID: <span className="font-mono font-bold text-purple-400">{order._id}</span></p>
      </div>

      <div className="glass-card p-6 border border-white/5 mb-4">
        <h2 className="font-bold text-lg text-white/80 mb-4 flex items-center gap-2"><FiPackage /> Order Items</h2>
        <div className="space-y-3">
          {order.orderItems.map(item => (
            <div key={item._id || item.product} className="flex gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
              <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
              <div className="flex-1">
                <div className="font-semibold text-white/80 text-sm">{item.name}</div>
                <div className="text-xs text-white/30">Qty: {item.qty}</div>
              </div>
              <div className="font-bold text-white/70">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-5 border border-white/5">
          <h3 className="font-bold text-white/70 mb-2 text-sm">📍 Shipping To</h3>
          <p className="text-sm text-white/40">{order.shippingAddress.address}</p>
          <p className="text-sm text-white/40">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
          <p className="text-sm text-white/40">{order.shippingAddress.country}</p>
        </div>
        <div className="relative overflow-hidden glass-card p-5 border border-purple-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5"></div>
          <div className="relative">
            <h3 className="font-bold text-white/70 mb-2 text-sm">💳 Payment Total</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-white/40"><span>Items</span><span className="text-white/60">${order.itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-white/40"><span>Tax</span><span className="text-white/60">${order.taxPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-white/40"><span>Shipping</span><span className="text-white/60">${order.shippingPrice.toFixed(2)}</span></div>
            </div>
            <div className="flex justify-between text-2xl font-bold mt-3 pt-3 border-t border-white/10">
              <span className="text-white">Total</span><span className="gradient-text">${order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-3 px-3 py-1 inline-block rounded-lg bg-green-500/10 text-green-400 text-[10px] font-semibold border border-green-500/20">✓ Paid via Stripe</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <Link to="/" className="btn-secondary flex items-center gap-2 text-sm py-2.5"><FiHome /> Home</Link>
        <Link to="/orders" className="btn-primary flex items-center gap-2 text-sm py-2.5"><FiPackage /> View All Orders</Link>
        <Link to="/products" className="btn-secondary flex items-center gap-2 text-sm py-2.5"><FiShoppingBag /> Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
