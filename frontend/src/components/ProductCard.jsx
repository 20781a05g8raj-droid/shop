import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useRef, useState } from 'react';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const cardStyle = isHovered ? {
    transform: `perspective(800px) rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 4}deg) translateY(-8px) scale(1.02)`,
    transition: 'transform 0.1s ease-out'
  } : {
    transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      style={cardStyle}
      className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-purple-500/20"
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(139, 92, 246, 0.15), transparent 60%)`
          }}
        />
      )}

      {/* Image */}
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden aspect-square bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
          <span className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <FiEye size={12} /> Quick View
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 ${
            isInWishlist(product._id)
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-110'
              : 'bg-black/30 text-white/80 hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/30 hover:scale-110'
          }`}
        >
          <FiHeart fill={isInWishlist(product._id) ? 'currentColor' : 'none'} size={14} />
        </button>

        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/20 uppercase tracking-wider">
            Featured
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="relative z-10 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-400 font-semibold uppercase tracking-wider">{product.category}</span>
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-sm text-white/80 line-clamp-2 hover:text-purple-400 transition-colors duration-300 min-h-[2.5rem]">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={11} className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/15'} />
          ))}
          <span className="text-[10px] text-white/30 ml-1">({product.numReviews})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div>
            <span className="text-xl font-bold gradient-text">${product.price}</span>
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100"
          >
            <FiShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
