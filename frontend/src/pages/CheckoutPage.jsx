import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiCheck, FiLock, FiPhone } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: ''
  });
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const tax = cartTotal * 0.1;
  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const total = cartTotal + tax + shippingCost;

  if (cartItems.length === 0) { navigate('/cart'); return null; }

  const handleShippingSubmit = (e) => { e.preventDefault(); setStep(2); };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));

    const order = {
      _id: 'ORD-' + Date.now(),
      // Tag with userId so each user sees only their own orders
      userId: user._id || user.email,
      userName: user.name,
      userEmail: user.email,
      userPhone: shipping.phone,
      orderItems: cartItems.map(i => ({ ...i, product: i._id })),
      shippingAddress: shipping,
      paymentMethod: 'Stripe',
      itemsPrice: cartTotal,
      taxPrice: tax,
      shippingPrice: shippingCost,
      totalPrice: total,
      isPaid: true,
      paidAt: new Date().toISOString(),
      status: 'Processing',
      createdAt: new Date().toISOString(),
      paymentResult: { id: 'pi_' + Date.now(), status: 'succeeded' }
    };

    // Store in a GLOBAL allOrders list (for admin), keyed by userId for users
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    allOrders.unshift(order);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    clearCart();
    toast.success('Payment successful! 🎉');
    navigate(`/order/${order._id}`);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-purple-500/50 outline-none transition-all text-sm";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 page-enter">
      <h1 className="text-3xl font-display font-bold text-white mb-6">Secure <span className="gradient-text">Checkout</span></h1>

      {/* Steps */}
      <div className="flex items-center justify-center mb-10 gap-2">
        {[
          { n: 1, label: 'Shipping', icon: FiMapPin },
          { n: 2, label: 'Payment', icon: FiCreditCard },
          { n: 3, label: 'Confirm', icon: FiCheck }
        ].map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 border text-sm ${step >= s.n ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/5 text-white/25'}`}>
              <s.icon size={14} /> <span className="font-semibold hidden sm:inline">{s.label}</span>
            </div>
            {i < 2 && <div className={`w-8 h-0.5 mx-1 rounded transition-colors duration-500 ${step > s.n ? 'bg-purple-500/50' : 'bg-white/5'}`}></div>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div>
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="glass-card p-6 border border-white/5 animate-slide-up">
              <h2 className="text-lg font-bold text-white/80 mb-5 flex items-center gap-2"><FiMapPin /> Shipping Address & Contact</h2>
              <div className="space-y-4">
                {/* Phone Number — required */}
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/50" size={15} />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. +977 98XXXXXXXX)"
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    className={`${inputClass} pl-10`}
                  />
                </div>
                <input type="text" required placeholder="Street Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" required placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} />
                  <input type="text" required placeholder="Postal Code" value={shipping.postalCode} onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} className={inputClass} />
                </div>
                <select value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className={inputClass}>
                  <option>United States</option><option>United Kingdom</option><option>Canada</option><option>India</option><option>Nepal</option><option>Australia</option>
                </select>
              </div>
              <button type="submit" className="btn-primary mt-6 w-full py-3.5">Continue to Payment →</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePayment} className="glass-card p-6 border border-white/5 animate-slide-up">
              <h2 className="text-lg font-bold text-white/80 mb-2 flex items-center gap-2"><FiCreditCard /> Payment Information</h2>
              <div className="flex items-center gap-2 text-[10px] text-white/30 mb-5"><FiLock size={10} /> Secured by Stripe — your payment info is encrypted</div>

              {/* Virtual Card */}
              <div className="relative overflow-hidden rounded-2xl p-6 mb-5 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-orange-500/10"></div>
                <div className="relative text-white">
                  <div className="flex justify-between mb-6">
                    <div className="text-xs text-white/50">I-WAY VISA</div>
                    <div className="text-xl">💳</div>
                  </div>
                  <div className="font-mono text-lg tracking-wider mb-4 text-white/80">{card.number || '•••• •••• •••• ••••'}</div>
                  <div className="flex justify-between text-sm">
                    <div><div className="text-[9px] text-white/30 uppercase">Card Holder</div><div className="font-semibold text-white/70 text-xs">{card.name || 'YOUR NAME'}</div></div>
                    <div><div className="text-[9px] text-white/30 uppercase">Expires</div><div className="font-semibold text-white/70 text-xs">{card.expiry || 'MM/YY'}</div></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <input type="text" required maxLength={19} placeholder="Card Number (4242 4242 4242 4242)" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() })} className={`${inputClass} font-mono`} />
                <input type="text" required placeholder="Cardholder Name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })} className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" required maxLength={5} placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5) })} className={inputClass} />
                  <input type="text" required maxLength={4} placeholder="CVC" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '') })} className={inputClass} />
                </div>
              </div>

              <div className="mt-3 p-3 bg-blue-500/5 rounded-xl text-[10px] text-blue-400/60 border border-blue-500/10">
                💡 <strong>Test Card:</strong> 4242 4242 4242 4242 | Any future date | Any CVC
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">← Back</button>
                <button type="submit" disabled={processing} className="btn-primary flex-1 py-3 disabled:opacity-30">
                  {processing ? '⏳ Processing...' : `Pay $${total.toFixed(2)} 🔒`}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="glass-card p-5 border border-white/5 h-fit sticky top-24">
          <h3 className="font-bold text-white/70 mb-4 text-sm">Order Summary</h3>
          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
            {cartItems.map(i => (
              <div key={i._id} className="flex gap-2 items-center text-sm">
                <img src={i.image} className="w-11 h-11 rounded-lg object-cover border border-white/5" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="line-clamp-1 font-semibold text-[11px] text-white/60">{i.name}</div>
                  <div className="text-[10px] text-white/30">x{i.qty}</div>
                </div>
                <div className="font-bold text-xs text-white/70">${(i.price * i.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-3 border-t border-white/5 text-sm">
            <div className="flex justify-between text-white/40"><span>Subtotal</span><span className="text-white/60">${cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-white/40"><span>Tax</span><span className="text-white/60">${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-white/40"><span>Shipping</span><span className="text-white/60">{shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-xl pt-2 border-t border-white/5">
              <span className="text-white">Total</span><span className="gradient-text">${total.toFixed(2)}</span>
            </div>
          </div>
          {/* Show shipping phone if entered */}
          {shipping.phone && (
            <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-white/30">
              📞 {shipping.phone}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
