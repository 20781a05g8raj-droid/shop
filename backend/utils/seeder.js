const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const users = [
  { name: 'Admin User', email: 'admin@iwayshopee.com', password: bcrypt.hashSync('admin123', 10), isAdmin: true },
  { name: 'John Doe', email: 'john@example.com', password: bcrypt.hashSync('123456', 10) },
  { name: 'Jane Smith', email: 'jane@example.com', password: bcrypt.hashSync('123456', 10) }
];

const products = [
  {
    name: 'Wireless Bluetooth Headphones Pro',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    brand: 'SoundMax', category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and crystal-clear audio.',
    price: 129.99, countInStock: 25, rating: 4.5, numReviews: 12, featured: true
  },
  {
    name: 'Smart Watch Ultra Series',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    brand: 'TechFit', category: 'Electronics',
    description: 'Advanced smartwatch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
    price: 249.99, countInStock: 15, rating: 4.7, numReviews: 28, featured: true
  },
  {
    name: 'Professional DSLR Camera',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600',
    brand: 'PhotoPro', category: 'Electronics',
    description: '24MP DSLR camera with 4K video, dual lens kit, and Wi-Fi connectivity.',
    price: 899.99, countInStock: 8, rating: 4.8, numReviews: 19, featured: true
  },
  {
    name: 'Gaming Laptop RTX 4070',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    brand: 'GameForce', category: 'Electronics',
    description: 'High-performance gaming laptop with RTX 4070, 32GB RAM, 1TB SSD, 165Hz display.',
    price: 1599.99, countInStock: 5, rating: 4.6, numReviews: 14, featured: true
  },
  {
    name: 'Designer Leather Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    brand: 'StyleCo', category: 'Fashion',
    description: 'Premium genuine leather jacket with modern fit. Available in multiple sizes.',
    price: 199.99, countInStock: 30, rating: 4.4, numReviews: 22, featured: false
  },
  {
    name: 'Running Sneakers Pro',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    brand: 'SportFlex', category: 'Fashion',
    description: 'Lightweight running sneakers with advanced cushioning technology.',
    price: 89.99, countInStock: 50, rating: 4.5, numReviews: 45, featured: true
  },
  {
    name: 'Modern Coffee Maker',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600',
    brand: 'BrewMaster', category: 'Home',
    description: 'Programmable 12-cup coffee maker with thermal carafe and built-in grinder.',
    price: 149.99, countInStock: 20, rating: 4.3, numReviews: 31, featured: false
  },
  {
    name: 'Ergonomic Office Chair',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
    brand: 'ComfortPro', category: 'Home',
    description: 'Premium ergonomic office chair with lumbar support and breathable mesh.',
    price: 329.99, countInStock: 12, rating: 4.6, numReviews: 17, featured: true
  },
  {
    name: 'Yoga Mat Premium',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    brand: 'ZenFit', category: 'Sports',
    description: 'Non-slip eco-friendly yoga mat with carrying strap. 6mm thick for ultimate comfort.',
    price: 39.99, countInStock: 100, rating: 4.7, numReviews: 89, featured: false
  },
  {
    name: 'Mountain Bike Pro X',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
    brand: 'TrailMaster', category: 'Sports',
    description: '21-speed mountain bike with hydraulic disc brakes and aluminum frame.',
    price: 599.99, countInStock: 7, rating: 4.5, numReviews: 11, featured: false
  },
  {
    name: 'Wireless Earbuds Mini',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600',
    brand: 'SoundMax', category: 'Electronics',
    description: 'True wireless earbuds with 30-hour battery, ANC, and waterproof design.',
    price: 79.99, countInStock: 60, rating: 4.4, numReviews: 67, featured: true
  },
  {
    name: 'Smart Home Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
    brand: 'EchoTech', category: 'Electronics',
    description: 'Voice-activated smart speaker with premium 360° sound and home automation.',
    price: 99.99, countInStock: 35, rating: 4.5, numReviews: 54, featured: false
  }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(p => ({ ...p, user: adminUser }));
    await Product.insertMany(sampleProducts);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(`❌ ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️ Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(`❌ ${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') destroyData();
else importData();
