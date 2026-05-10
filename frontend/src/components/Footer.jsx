import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiArrowUp } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer ref={footerRef} className="relative mt-24 border-t border-white/5 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-purple-900/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="reveal">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-purple-500/20">I</div>
              <div>
                <span className="font-display font-bold text-xl gradient-text">I-WAY</span>
                <span className="font-display font-bold text-xl text-white/50 ml-1">Shopee</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">Your premium destination for everything you love. Quality products, secure checkout, lightning-fast delivery.</p>
            <div className="flex gap-2">
              {[FiFacebook, FiTwitter, FiInstagram, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-pink-500/30 flex items-center justify-center text-white/40 hover:text-white border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/10">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="reveal">
            <h3 className="font-bold mb-5 text-white/80 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Electronics', href: '/products?category=Electronics' },
                { label: 'Fashion', href: '/products?category=Fashion' },
                { label: 'Home & Living', href: '/products?category=Home' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/35 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-purple-400 group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="reveal">
            <h3 className="font-bold mb-5 text-white/80 text-sm uppercase tracking-wider">Customer Care</h3>
            <ul className="space-y-3">
              {[
                { label: 'Help Center', href: '/help-center' },
                { label: 'Track Order', href: '/track-order' },
                { label: 'Returns & Refunds', href: '/returns' },
                { label: 'Contact Us', href: '/contact' }
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/35 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-purple-400 group-hover:w-3 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="reveal">
            <h3 className="font-bold mb-5 text-white/80 text-sm uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-white/35 mb-4">Subscribe for exclusive deals & 10% off your first order!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-300"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300">
                <FiMail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-white/25">
            © 2026 I-WAY Shopee. All rights reserved. Made with 💜
          </p>
          <button onClick={scrollToTop} className="group flex items-center gap-2 text-sm text-white/25 hover:text-purple-400 transition-all duration-300">
            Back to top
            <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 transition-all duration-300 group-hover:-translate-y-1">
              <FiArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
