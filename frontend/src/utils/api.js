import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// MOCK DATA for demo without backend
export const MOCK_PRODUCTS = [
  { _id: '1', name: 'Wireless Bluetooth Headphones Pro', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', brand: 'SoundMax', category: 'Electronics', description: 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals.', price: 129.99, countInStock: 25, rating: 4.5, numReviews: 12, featured: true, reviews: [
    { _id: 'r1', name: 'Alex Johnson', rating: 5, comment: 'Amazing sound quality! Best headphones I have ever owned.', createdAt: '2024-01-15' },
    { _id: 'r2', name: 'Sarah Williams', rating: 4, comment: 'Great battery life and comfortable for long use.', createdAt: '2024-02-20' }
  ]},
  { _id: '2', name: 'Smart Watch Ultra Series', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', brand: 'TechFit', category: 'Electronics', description: 'Advanced smartwatch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Stay connected and healthy.', price: 249.99, countInStock: 15, rating: 4.7, numReviews: 28, featured: true, reviews: [] },
  { _id: '3', name: 'Professional DSLR Camera', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600', brand: 'PhotoPro', category: 'Electronics', description: '24MP DSLR camera with 4K video recording, dual lens kit, and Wi-Fi connectivity. Capture every moment in stunning detail.', price: 899.99, countInStock: 8, rating: 4.8, numReviews: 19, featured: true, reviews: [] },
  { _id: '4', name: 'Gaming Laptop RTX 4070', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600', brand: 'GameForce', category: 'Electronics', description: 'High-performance gaming laptop with RTX 4070, 32GB RAM, 1TB SSD, and 165Hz display. Dominate every game.', price: 1599.99, countInStock: 5, rating: 4.6, numReviews: 14, featured: true, reviews: [] },
  { _id: '5', name: 'Designer Leather Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', brand: 'StyleCo', category: 'Fashion', description: 'Premium genuine leather jacket with modern fit. Available in multiple sizes. Timeless style for every wardrobe.', price: 199.99, countInStock: 30, rating: 4.4, numReviews: 22, featured: false, reviews: [] },
  { _id: '6', name: 'Running Sneakers Pro', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', brand: 'SportFlex', category: 'Fashion', description: 'Lightweight running sneakers with advanced cushioning technology. Run faster, run longer.', price: 89.99, countInStock: 50, rating: 4.5, numReviews: 45, featured: true, reviews: [] },
  { _id: '7', name: 'Modern Coffee Maker', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600', brand: 'BrewMaster', category: 'Home', description: 'Programmable 12-cup coffee maker with thermal carafe and built-in grinder. Wake up to perfect coffee.', price: 149.99, countInStock: 20, rating: 4.3, numReviews: 31, featured: false, reviews: [] },
  { _id: '8', name: 'Ergonomic Office Chair', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600', brand: 'ComfortPro', category: 'Home', description: 'Premium ergonomic office chair with lumbar support and breathable mesh. Work in comfort all day.', price: 329.99, countInStock: 12, rating: 4.6, numReviews: 17, featured: true, reviews: [] },
  { _id: '9', name: 'Yoga Mat Premium', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', brand: 'ZenFit', category: 'Sports', description: 'Non-slip eco-friendly yoga mat with carrying strap. 6mm thick for ultimate comfort during practice.', price: 39.99, countInStock: 100, rating: 4.7, numReviews: 89, featured: false, reviews: [] },
  { _id: '10', name: 'Mountain Bike Pro X', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600', brand: 'TrailMaster', category: 'Sports', description: '21-speed mountain bike with hydraulic disc brakes and aluminum frame. Built for the toughest trails.', price: 599.99, countInStock: 7, rating: 4.5, numReviews: 11, featured: false, reviews: [] },
  { _id: '11', name: 'Wireless Earbuds Mini', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600', brand: 'SoundMax', category: 'Electronics', description: 'True wireless earbuds with 30-hour battery, ANC, and waterproof design. Music on the go.', price: 79.99, countInStock: 60, rating: 4.4, numReviews: 67, featured: true, reviews: [] },
  { _id: '12', name: 'Smart Home Speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', brand: 'EchoTech', category: 'Electronics', description: 'Voice-activated smart speaker with premium 360° sound and home automation features.', price: 99.99, countInStock: 35, rating: 4.5, numReviews: 54, featured: false, reviews: [] }
];

export const fetchProducts = async (params = {}) => {
  try {
    const { data } = await api.get('/products', { params });
    return data;
  } catch {
    let filtered = [...MOCK_PRODUCTS];
    if (params.keyword) filtered = filtered.filter(p => p.name.toLowerCase().includes(params.keyword.toLowerCase()));
    if (params.category && params.category !== 'all') filtered = filtered.filter(p => p.category === params.category);
    if (params.minPrice) filtered = filtered.filter(p => p.price >= Number(params.minPrice));
    if (params.maxPrice) filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
    if (params.minRating) filtered = filtered.filter(p => p.rating >= Number(params.minRating));
    if (params.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (params.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    return { products: filtered, page: 1, pages: 1, total: filtered.length };
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch {
    return MOCK_PRODUCTS.find(p => p._id === id);
  }
};

export const fetchFeatured = async () => {
  try {
    const { data } = await api.get('/products/featured');
    return data;
  } catch {
    return MOCK_PRODUCTS.filter(p => p.featured);
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await api.get('/products/categories');
    return data;
  } catch {
    return [...new Set(MOCK_PRODUCTS.map(p => p.category))];
  }
};

export default api;
