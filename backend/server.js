const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

app.get('/api/config/stripe', (req, res) =>
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
);

app.get('/', (req, res) => {
  res.json({
    message: '🛍️ I-WAY Shopee API is running...',
    version: '1.0.0',
    endpoints: ['/api/users', '/api/products', '/api/orders', '/api/payment', '/api/wishlist']
  });
});

// Error handlers
app.use((req, res, next) => {
  res.status(404).json({ message: `Not found - ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 I-WAY Shopee Server running on port ${PORT}`)
);
