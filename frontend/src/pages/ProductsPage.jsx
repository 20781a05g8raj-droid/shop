import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiSliders } from 'react-icons/fi';
import { fetchProducts, fetchCategories } from '../utils/api';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useRef(null);

  const filters = {
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    sort: searchParams.get('sort') || 'newest'
  };

  useEffect(() => { fetchCategories().then(setCategories); }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts(filters).then(d => {
      setProducts(d.products);
      setLoading(false);
    });
  }, [searchParams]);

  // Animate products on load
  useEffect(() => {
    if (!loading && gridRef.current) {
      gridRef.current.querySelectorAll('.product-item').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 60);
      });
    }
  }, [loading, products]);

  const updateFilter = (key, value) => {
    const params = Object.fromEntries(searchParams);
    if (value && value !== 'all') params[key] = value;
    else delete params[key];
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white">All <span className="gradient-text">Products</span></h1>
        <p className="text-white/40 mt-2">{products.length} amazing products available</p>
      </div>

      {/* Mobile filter toggle */}
      <div className="flex gap-3 mb-4 lg:hidden">
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-semibold text-sm hover:bg-white/10 transition-all">
          <FiSliders size={16} /> Filters
        </button>
        <select value={filters.sort} onChange={(e) => updateFilter('sort', e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block glass-card p-5 h-fit sticky top-24 border border-white/5`}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white/80 flex items-center gap-2"><FiFilter size={16} /> Filters</h3>
            <button onClick={clearFilters} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Clear All</button>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-white/60 mb-3 uppercase tracking-wider">Category</h4>
            <div className="space-y-1">
              <label className="flex items-center gap-2.5 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-lg transition-all text-sm text-white/50 hover:text-white/80">
                <input type="radio" name="cat" checked={filters.category === 'all'} onChange={() => updateFilter('category', 'all')} className="accent-purple-500" />
                All Categories
              </label>
              {categories.map(c => (
                <label key={c} className="flex items-center gap-2.5 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-lg transition-all text-sm text-white/50 hover:text-white/80">
                  <input type="radio" name="cat" checked={filters.category === c} onChange={() => updateFilter('category', c)} className="accent-purple-500" />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-white/60 mb-3 uppercase tracking-wider">Price Range</h4>
            <div className="flex gap-2">
              <input type="number" placeholder="Min" value={filters.minPrice} onChange={(e) => updateFilter('minPrice', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-500/50" />
              <input type="number" placeholder="Max" value={filters.maxPrice} onChange={(e) => updateFilter('maxPrice', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-500/50" />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-white/60 mb-3 uppercase tracking-wider">Min Rating</h4>
            <div className="space-y-1">
              {[4, 3, 2, 1].map(r => (
                <label key={r} className="flex items-center gap-2.5 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-lg transition-all text-sm text-white/50 hover:text-white/80">
                  <input type="radio" name="rating" checked={filters.minRating === String(r)} onChange={() => updateFilter('minRating', r)} className="accent-purple-500" />
                  {'★'.repeat(r)}{'☆'.repeat(5-r)} & up
                </label>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <h4 className="font-semibold text-sm text-white/60 mb-3 uppercase tracking-wider">Sort By</h4>
            <select value={filters.sort} onChange={(e) => updateFilter('sort', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm focus:outline-none focus:border-purple-500/50">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* Products grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="glass-card-light p-4 border border-white/5">
                  <div className="skeleton aspect-square rounded-xl mb-3"></div>
                  <div className="skeleton h-4 rounded mb-2 w-3/4"></div>
                  <div className="skeleton h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-7xl mb-4 animate-float">🔍</div>
              <h3 className="text-2xl font-bold text-white">No products found</h3>
              <p className="text-white/40 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <div key={p._id} className="product-item">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
