import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiMinus, FiPlus } from 'react-icons/fi';
import { fetchProductById } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProductById(id).then(setProduct);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="skeleton aspect-square rounded-3xl"></div>
        <div className="space-y-4">
          <div className="skeleton h-8 rounded-lg w-1/3"></div>
          <div className="skeleton h-12 rounded-lg w-3/4"></div>
          <div className="skeleton h-6 rounded-lg w-1/2"></div>
          <div className="skeleton h-16 rounded-lg w-1/3"></div>
          <div className="skeleton h-24 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to leave a review'); return; }
    toast.success('Review submitted! (Demo mode)');
    setReviewForm({ rating: 5, comment: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      {/* Breadcrumb */}
      <nav className="text-sm text-white/30 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-purple-400 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-purple-400">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
          <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.02] rounded-3xl p-8 border border-white/5 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImgLoaded(true)}
              className={`w-full max-w-md mx-auto aspect-square object-cover rounded-2xl transition-all duration-700 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />
            {/* Floating particles */}
            <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-purple-400/30 animate-float"></div>
            <div className="absolute bottom-12 left-8 w-2 h-2 rounded-full bg-pink-400/30 animate-float-reverse"></div>
          </div>
        </div>

        {/* Info */}
        <div className="animate-slide-up">
          <span className="inline-block px-3 py-1 rounded-lg bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{product.name}</h1>
          <p className="text-white/40 mb-4">by <span className="font-semibold text-purple-400">{product.brand}</span></p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={18} className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'} />
              ))}
            </div>
            <span className="text-sm text-white/40">({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-5xl font-bold gradient-text">${product.price}</span>
            <span className="text-xl text-white/20 line-through">${(product.price * 1.3).toFixed(2)}</span>
            <span className="px-2.5 py-1 rounded-lg bg-green-500/15 text-green-400 text-xs font-bold">23% OFF</span>
          </div>

          <p className="text-white/50 mb-6 leading-relaxed">{product.description}</p>

          {/* Stock */}
          <div className={`mb-6 px-4 py-2.5 rounded-xl inline-flex items-center gap-2 ${product.countInStock > 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span className="font-semibold text-sm">{product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}</span>
          </div>

          {/* Quantity */}
          {product.countInStock > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <span className="font-semibold text-white/60 text-sm">Quantity:</span>
              <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-white/5 text-white/60 hover:text-white transition-colors rounded-l-xl"><FiMinus size={14} /></button>
                <span className="px-5 font-bold text-white">{qty}</span>
                <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-3 py-2 hover:bg-white/5 text-white/60 hover:text-white transition-colors rounded-r-xl"><FiPlus size={14} /></button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button onClick={() => addToCart(product, qty)} disabled={product.countInStock === 0} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-30 text-base py-3.5">
              <FiShoppingCart /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)} className={`p-3.5 rounded-xl border transition-all duration-300 ${isInWishlist(product._id) ? 'bg-pink-500/20 border-pink-500/30 text-pink-400 shadow-lg shadow-pink-500/10' : 'border-white/10 text-white/40 hover:border-pink-500/30 hover:text-pink-400 hover:bg-pink-500/5'}`}>
              <FiHeart size={20} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FiTruck, label: 'Free Shipping' },
              { icon: FiShield, label: 'Secure Pay' },
              { icon: FiRefreshCw, label: '30-Day Return' }
            ].map((f, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                <f.icon className="mx-auto mb-1 text-purple-400/60" size={18} />
                <div className="text-[10px] font-semibold text-white/40">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14 glass-card border border-white/5 overflow-hidden">
        <div className="flex border-b border-white/5">
          {['description', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-4 font-semibold capitalize transition-all duration-300 text-sm ${tab === t ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/5' : 'text-white/40 hover:text-white/60'}`}>
              {t} {t === 'reviews' && `(${product.numReviews})`}
            </button>
          ))}
        </div>
        <div className="p-6">
          {tab === 'description' && (
            <div>
              <p className="text-white/50 leading-relaxed">{product.description}</p>
              <ul className="mt-5 space-y-2.5">
                {['✨ Premium quality materials', '🚀 Fast and free shipping', '🛡️ 1-year warranty included', '♻️ Eco-friendly packaging'].map((item, i) => (
                  <li key={i} className="text-white/40 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === 'reviews' && (
            <div>
              {product.reviews?.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {product.reviews.map(r => (
                    <div key={r._id} className="border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">{r.name.charAt(0)}</div>
                        <span className="font-semibold text-white/80 text-sm">{r.name}</span>
                        <div className="flex">{[...Array(5)].map((_, i) => <FiStar key={i} size={11} className={i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'} />)}</div>
                      </div>
                      <p className="text-white/40 text-sm ml-11">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 mb-6">No reviews yet. Be the first to review!</p>
              )}

              {user && (
                <form onSubmit={handleSubmitReview} className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <h4 className="font-bold text-white/80 mb-3 text-sm">Write a Review</h4>
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: n })} className="hover:scale-125 transition-transform">
                        <FiStar size={22} className={n <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'} />
                      </button>
                    ))}
                  </div>
                  <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} placeholder="Share your thoughts..." className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 mb-3 text-sm focus:outline-none focus:border-purple-500/50" rows={3} required />
                  <button type="submit" className="btn-primary text-sm py-2.5">Submit Review</button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
