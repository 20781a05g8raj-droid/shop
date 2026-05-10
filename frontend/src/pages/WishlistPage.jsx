import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center page-enter">
        <div className="text-7xl mb-5 animate-float">💝</div>
        <h1 className="text-3xl font-bold text-white mb-2">Your wishlist is empty</h1>
        <p className="text-white/40 mb-8">Start saving products you love</p>
        <Link to="/products" className="btn-primary inline-block px-8 py-3.5">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <h1 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-2">
        <FiHeart className="text-pink-400" fill="currentColor" /> My <span className="gradient-text">Wishlist</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((p, i) => (
          <div key={p._id} className="glass-card p-4 border border-pink-500/10 flex gap-4 hover:border-pink-500/20 transition-all duration-300" style={{ animation: `slideUp 0.5s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`, opacity: 0 }}>
            <Link to={`/product/${p._id}`}>
              <img src={p.image} className="w-24 h-24 rounded-xl object-cover" alt={p.name} />
            </Link>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link to={`/product/${p._id}`}>
                  <h3 className="font-semibold text-white/80 line-clamp-2 hover:text-purple-400 transition-colors text-sm">{p.name}</h3>
                </Link>
                <div className="text-lg font-bold gradient-text mt-1">${p.price}</div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => addToCart(p, 1)} className="flex-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white text-xs font-semibold flex items-center justify-center gap-1 hover:from-purple-500 hover:to-pink-500 transition-all">
                  <FiShoppingCart size={12} /> Add
                </button>
                <button onClick={() => toggleWishlist(p)} className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
