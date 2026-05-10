import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const tax = cartTotal * 0.1;
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const grandTotal = cartTotal + tax + shipping;

  const checkout = () => {
    if (!user) navigate('/login?redirect=/checkout');
    else navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center page-enter">
        <div className="text-7xl mb-5 animate-float">🛒</div>
        <h1 className="text-3xl font-bold text-white mb-2">Your cart is empty</h1>
        <p className="text-white/40 mb-8">Looks like you haven't added anything yet</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5">
          <FiShoppingBag /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <h1 className="text-3xl font-display font-bold text-white mb-6">Shopping <span className="gradient-text">Cart</span></h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-3">
          {cartItems.map((item, i) => (
            <div key={item._id} className="glass-card p-4 border border-white/5 flex gap-4 hover:border-purple-500/20 transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
              <Link to={`/product/${item._id}`}>
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item._id}`}>
                  <h3 className="font-semibold text-white/80 hover:text-purple-400 transition-colors">{item.name}</h3>
                </Link>
                <p className="text-sm text-white/30">{item.brand} • {item.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-white/10 rounded-lg bg-white/5">
                    <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))} className="px-2.5 py-1.5 hover:bg-white/5 text-white/50 rounded-l-lg"><FiMinus size={12} /></button>
                    <span className="px-3 text-sm font-bold text-white">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-2.5 py-1.5 hover:bg-white/5 text-white/50 rounded-r-lg"><FiPlus size={12} /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg gradient-text">${(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item._id)} className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"><FiTrash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="relative h-fit sticky top-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
          <div className="relative glass-card p-6 border border-purple-500/10">
            <h2 className="text-xl font-bold text-white mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5 pb-5 border-b border-white/5">
              <div className="flex justify-between text-white/50"><span>Subtotal</span><span className="text-white font-semibold">${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-white/50"><span>Tax (10%)</span><span className="text-white font-semibold">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-white/50"><span>Shipping</span><span className="text-white font-semibold">{shipping === 0 ? <span className="text-green-400">FREE 🎉</span> : `$${shipping.toFixed(2)}`}</span></div>
            </div>
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span className="text-white">Total</span>
              <span className="gradient-text">${grandTotal.toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base">
              Proceed to Checkout <FiArrowRight />
            </button>
            <p className="text-[10px] text-white/25 text-center mt-3">🔒 Secure checkout powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
