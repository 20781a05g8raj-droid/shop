import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) setCartItems(JSON.parse(saved));
    const wl = localStorage.getItem('wishlist');
    if (wl) setWishlist(JSON.parse(wl));
  }, []);

  useEffect(() => { localStorage.setItem('cartItems', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find(x => x._id === product._id);
    if (existing) {
      setCartItems(cartItems.map(x => x._id === product._id ? { ...x, qty: x.qty + qty } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(x => x._id !== id));
    toast.success('Removed from cart');
  };

  const updateQty = (id, qty) => {
    setCartItems(cartItems.map(x => x._id === id ? { ...x, qty: Number(qty) } : x));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    if (wishlist.find(x => x._id === product._id)) {
      setWishlist(wishlist.filter(x => x._id !== product._id));
      toast.success('Removed from wishlist');
    } else {
      setWishlist([...wishlist, product]);
      toast.success('Added to wishlist ❤️');
    }
  };

  const isInWishlist = (id) => wishlist.some(x => x._id === id);

  const cartTotal = cartItems.reduce((acc, x) => acc + x.price * x.qty, 0);
  const cartCount = cartItems.reduce((acc, x) => acc + x.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems, wishlist, addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
