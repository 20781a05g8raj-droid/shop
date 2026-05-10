import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiLogOut, FiPackage, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/products?keyword=${searchTerm}`);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Electronics', path: '/products?category=Electronics' },
    { label: 'Fashion', path: '/products?category=Fashion' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-black/80 backdrop-blur-2xl shadow-2xl shadow-purple-500/5 border-b border-white/5'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              I
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl gradient-text tracking-tight">I-WAY</span>
              <span className="font-display font-bold text-xl text-white/60 ml-1">Shopee</span>
            </div>
          </Link>

          {/* Center Nav Links — hidden on mobile */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:block">
            <div className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={16} />
              <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white text-xs font-semibold hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                Search
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/wishlist" className="relative p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 group" data-tooltip="Wishlist">
              <FiHeart size={20} className="text-pink-400/70 group-hover:text-pink-400 transition-colors group-hover:scale-110 transform duration-300" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[10px] rounded-full w-4.5 h-4.5 flex items-center justify-center font-bold animate-scale-in shadow-lg shadow-pink-500/30 min-w-[18px] min-h-[18px]">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 group" data-tooltip="Cart">
              <FiShoppingCart size={20} className="text-purple-400/70 group-hover:text-purple-400 transition-colors group-hover:scale-110 transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-scale-in shadow-lg shadow-orange-500/30 min-w-[18px] min-h-[18px]">{cartCount}</span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-semibold text-white/80">{user.name?.split(' ')[0]}</span>
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass-card overflow-hidden animate-slide-down z-50">
                    <div className="p-3 border-b border-white/5 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-white/50">{user.email}</div>
                    </div>
                    <Link to="/profile" onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                      <FiUser size={16} /> Profile
                    </Link>
                    <Link to="/orders" onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                      <FiPackage size={16} /> My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link to="/admin" onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                        <FiSettings size={16} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { logout(); setShowMenu(false); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200">
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-5">Login</Link>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2.5 rounded-xl hover:bg-white/5 text-white/70">
              {mobileMenu ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden mt-3 pb-3 border-t border-white/5 pt-3 animate-slide-down">
            <form onSubmit={handleSearch} className="mb-3 md:hidden">
              <div className="relative">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search products..." className="w-full px-4 py-2.5 pl-10 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none" />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              </div>
            </form>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.path} onClick={() => setMobileMenu(false)} className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
