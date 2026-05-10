import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import HelpCenterPage from './pages/HelpCenterPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ReturnsPage from './pages/ReturnsPage';
import ContactPage from './pages/ContactPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <div className="min-h-screen flex flex-col noise-bg grid-bg relative">
    {/* Ambient background glows */}
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/[0.02] rounded-full blur-[150px]"></div>
    </div>

    <ScrollToTop />
    <Navbar />
    <main className="flex-1 relative z-10">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:id" element={<OrderConfirmationPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
