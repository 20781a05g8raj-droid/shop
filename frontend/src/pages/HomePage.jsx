import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiGift, FiZap, FiStar, FiTrendingUp } from 'react-icons/fi';
import { fetchFeatured, fetchCategories } from '../utils/api';
import ProductCard from '../components/ProductCard';

/* ===== Particle Background ===== */
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ===== Animated Counter ===== */
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(num * ease));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ===== Scroll Reveal Hook ===== */
const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title1: "Shop the",
      title2: "Vibrant",
      title3: "Way",
      desc: "Discover thousands of amazing products with lightning-fast checkout, secure payments, and free shipping worldwide.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      bgImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600",
      badgeText: "50% OFF ✨",
      badgeColor: "from-orange-500 to-pink-500",
      blobColor: "from-purple-500/20 via-pink-500/15 to-orange-500/10",
      link: "/products?category=Electronics",
      overlay: "from-purple-900/80 via-black/70 to-pink-900/60",
    },
    {
      title1: "Latest",
      title2: "Fashion",
      title3: "Trends",
      desc: "Elevate your style with our exclusive new collections. Premium quality, unforgettable looks.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
      bgImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600",
      badgeText: "NEW ARRIVALS",
      badgeColor: "from-pink-500 to-purple-500",
      blobColor: "from-pink-500/20 via-purple-500/15 to-indigo-500/10",
      link: "/products?category=Fashion",
      overlay: "from-pink-900/80 via-black/70 to-purple-900/60",
    },
    {
      title1: "Smart",
      title2: "Gadgets",
      title3: "For You",
      desc: "Upgrade your life with the latest tech and innovative electronics.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600",
      badgeText: "TOP RATED",
      badgeColor: "from-teal-500 to-emerald-500",
      blobColor: "from-teal-500/20 via-cyan-500/15 to-blue-500/10",
      link: "/products?category=Electronics",
      overlay: "from-teal-900/80 via-black/70 to-blue-900/60",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const featRef = useScrollReveal();
  const catRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const featureRef = useScrollReveal();

  useEffect(() => {
    fetchFeatured().then(setFeatured);
    fetchCategories().then(setCategories);
  }, []);

  const categoryIcons = { Electronics: '⚡', Fashion: '👗', Home: '🏠', Sports: '🏀' };
  const categoryColors = {
    Electronics: 'from-purple-500/20 to-blue-500/20 border-purple-500/20 hover:border-purple-500/40',
    Fashion: 'from-pink-500/20 to-rose-500/20 border-pink-500/20 hover:border-pink-500/40',
    Home: 'from-orange-500/20 to-amber-500/20 border-orange-500/20 hover:border-orange-500/40',
    Sports: 'from-teal-500/20 to-emerald-500/20 border-teal-500/20 hover:border-teal-500/40'
  };

  return (
    <div className="page-enter">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* ── FULL-SCREEN BACKGROUND IMAGE SLIDER ── */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              opacity: idx === currentSlide ? 1 : 0,
              zIndex: 0
            }}
          />
        ))}
        {/* Dark gradient overlay changes per slide */}
        <div
          key={`overlay-${currentSlide}`}
          className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].overlay} transition-all duration-1000`}
          style={{ zIndex: 1 }}
        />

        {/* Particle overlay */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <ParticleField />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-20" style={{ zIndex: 2 }}></div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/15 rounded-full blur-[100px] animate-float" style={{ zIndex: 2 }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-float-reverse" style={{ zIndex: 2 }}></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center" style={{ zIndex: 3 }}>
          {/* Left Content */}
          <div key={`text-${currentSlide}`} className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6 animate-fade-in backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Welcome to I-WAY Shopee
            </span>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-5 text-white">
              {heroSlides[currentSlide].title1}<br />
              <span className="gradient-text">{heroSlides[currentSlide].title2}</span> {heroSlides[currentSlide].title3}
            </h1>

            <p className="text-lg text-white/50 mb-8 max-w-md leading-relaxed">
              {heroSlides[currentSlide].desc}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/products" className="btn-primary px-8 py-3.5 text-base flex items-center gap-2 group">
                Shop Now
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to={heroSlides[currentSlide].link} className="btn-secondary px-8 py-3.5 text-base">
                Explore Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { n: '10000', suffix: '+', label: 'Products' },
                { n: '50000', suffix: '+', label: 'Customers' },
                { n: '48', suffix: '★', label: 'Rating' }
              ].map((s, i) => (
                <div key={i} className="group">
                  <div className="text-3xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                    <AnimatedCounter target={s.n} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-white/30 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-[420px] h-[420px]">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-pink-500/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>

              {/* Morphing blob behind image */}
              <div className={`absolute inset-8 bg-gradient-to-br ${heroSlides[currentSlide].blobColor} animate-morph blur-xl transition-colors duration-1000`}></div>

              {/* Glass cards */}
              <div className="absolute inset-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 rotate-6 animate-float"></div>
              <div className="absolute inset-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 -rotate-3 animate-float-reverse"></div>

              {/* Hero image */}
              <img
                key={`img-${currentSlide}`}
                src={heroSlides[currentSlide].image}
                alt="Featured Product"
                className="absolute inset-14 w-[calc(100%-112px)] h-[calc(100%-112px)] object-cover rounded-2xl shadow-2xl shadow-purple-500/10 animate-scale-in"
              />

              {/* Floating badges */}
              <div key={`badge-${currentSlide}`} className={`absolute -top-2 -right-2 bg-gradient-to-r ${heroSlides[currentSlide].badgeColor} text-white px-4 py-2 rounded-xl font-bold shadow-xl shadow-purple-500/20 animate-float text-sm z-10`}>
                {heroSlides[currentSlide].badgeText}
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2.5 flex items-center gap-2 animate-float-reverse z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white">
                  <FiTrendingUp size={14} />
                </div>
                <div>
                  <div className="text-xs text-white/50">Sales</div>
                  <div className="text-sm font-bold text-white">+340%</div>
                </div>
              </div>
              <div className="absolute top-1/2 -right-8 glass-card px-3 py-2 flex items-center gap-1.5 animate-float z-10" style={{ animationDelay: '1s' }}>
                <FiStar className="text-yellow-400 fill-yellow-400" size={12} />
                <span className="text-xs font-bold text-white">4.8</span>
              </div>
              
              {/* Slider Dots */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-purple-500' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent"></div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      {/* ── ANIMATED BACKGROUND: aurora orbs follow scroll ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[150px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/[0.03] rounded-full blur-[150px] animate-float-reverse"></div>
        <div className="absolute top-2/3 left-1/2 w-[400px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <section ref={featureRef} className="relative max-w-7xl mx-auto px-4 py-12 -mt-8 z-10 overflow-hidden">
        {/* section animated bg */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/[0.03] via-transparent to-pink-500/[0.03] animate-gradient" style={{ backgroundSize: '300% 300%' }}></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger-children">
          {[
            { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $50', color: 'purple' },
            { icon: FiShield, title: 'Secure Payment', desc: 'Stripe encrypted', color: 'pink' },
            { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day guarantee', color: 'orange' },
            { icon: FiGift, title: 'Daily Deals', desc: 'Up to 70% off', color: 'teal' }
          ].map((f, i) => (
            <div key={i} className="reveal group glass-card-light p-5 border border-white/5 hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-1 cursor-default">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br from-${f.color}-500/20 to-${f.color}-500/5 flex items-center justify-center text-${f.color}-400 mb-3 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${f.color}-500/10 transition-all duration-500`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold text-white/80 text-sm">{f.title}</h3>
              <p className="text-xs text-white/30 mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section ref={catRef} className="relative max-w-7xl mx-auto px-4 py-16 overflow-hidden">
        {/* Animated aurora bg */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/[0.06] rounded-full blur-[100px] animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-500/[0.05] rounded-full blur-[120px] animate-float-reverse"></div>
        <div className="text-center mb-10 reveal">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">Browse our curated collections across multiple categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className={`reveal-scale relative rounded-2xl p-7 overflow-hidden card-hover bg-gradient-to-br ${categoryColors[cat] || 'from-purple-500/20 to-pink-500/20 border-purple-500/20'} border transition-all duration-500 group`}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">{categoryIcons[cat] || '🛍️'}</div>
                <h3 className="text-xl font-bold text-white">{cat}</h3>
                <p className="text-sm text-white/40 mt-1 flex items-center gap-1 group-hover:text-white/60 transition-colors">
                  Explore <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                </p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/3 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-200 transition-transform duration-700"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section ref={featRef} className="relative max-w-7xl mx-auto px-4 py-16 overflow-hidden">
        {/* Diagonal animated gradient */}
        <div className="absolute inset-0 opacity-50" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.04) 0%, transparent 40%, rgba(236,72,153,0.04) 100%)', animation: 'gradientShift 8s ease infinite', backgroundSize: '200% 200%' }}></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"></div>
        <div className="flex items-end justify-between mb-8 reveal">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              ⭐ Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-white/40 mt-2">Handpicked just for you</p>
          </div>
          <Link to="/products" className="text-purple-400 font-semibold hover:text-purple-300 flex items-center gap-1 group transition-colors">
            View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 stagger-children">
          {featured.slice(0, 8).map((p, i) => (
            <div key={p._id} className="reveal">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-4 py-16">
        <div className="reveal relative overflow-hidden rounded-3xl p-10 md:p-16 text-center border border-purple-500/10">
          {/* Animated CTA background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-pink-900/40 to-orange-900/30" style={{ animation: 'gradientShift 6s ease infinite', backgroundSize: '300% 300%' }}></div>
          {/* Moving grid lines */}
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-500/8 rounded-full blur-3xl animate-float-reverse"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Get <span className="gradient-text">20% Off</span> Your First Order!
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-lg mx-auto">Sign up today and unlock exclusive deals, early access to sales, and member-only discounts.</p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-lg group">
              Sign Up Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
