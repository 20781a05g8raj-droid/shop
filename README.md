# 🛍️ I-WAY Shopee — Full-Stack E-Commerce Platform

A vibrant, modern, full-featured e-commerce web application similar to Amazon. Built with React, Node.js, Express, MongoDB, JWT, and Stripe.

![I-WAY Shopee](https://img.shields.io/badge/I--WAY-Shopee-ec4899?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)

## ✨ Features

### 🛒 Customer Features
- 🔐 **User Authentication** — Signup, Login, JWT tokens, protected routes
- 🏠 **Vibrant Homepage** — Hero section, categories, featured products
- 🔍 **Search & Filters** — By keyword, category, price range, rating
- 📦 **Product Catalog** — Detailed product pages with images, descriptions
- ⭐ **Reviews & Ratings** — Write reviews, view ratings (1–5 stars)
- ❤️ **Wishlist** — Save favorite products for later
- 🛍️ **Shopping Cart** — Add, remove, update quantities (persisted)
- 💳 **Stripe Checkout** — Secure 3-step payment flow
- 📋 **Order History** — Track past orders & delivery status
- 👤 **User Profile** — Edit personal info, address, phone

### 👨‍💼 Admin Features
- 📊 **Dashboard** — Sales, orders, products, users analytics
- 🗂️ **Product Management** — Create, read, update, delete products
- 📦 **Order Management** — Update order status (Pending → Delivered)
- 👥 **User Management** — View and manage registered users

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** (lightning-fast dev experience)
- **TailwindCSS** (vibrant gradient design system)
- **React Router v6** (client-side routing)
- **React Hot Toast** (beautiful notifications)
- **React Icons** (Feather icons)
- **Axios** (API calls)
- **@stripe/react-stripe-js** (payment integration)

### Backend
- **Node.js** + **Express** (REST API)
- **MongoDB** + **Mongoose** (database & ODM)
- **JWT** (authentication)
- **bcryptjs** (password hashing)
- **Stripe** (payment processing)
- **Multer** (file uploads)
- **CORS** + **Morgan** (middleware)

## 📁 Project Structure

```
iway-shopee/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/              # Route logic
│   ├── middleware/authMiddleware.js  # JWT & admin auth
│   ├── models/                   # Mongoose schemas
│   ├── routes/                   # API endpoints
│   ├── utils/seeder.js           # DB seed script
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Entry point
└── frontend/
    ├── src/
    │   ├── components/           # Navbar, Footer, ProductCard
    │   ├── context/              # Auth & Cart contexts
    │   ├── pages/                # All page components
    │   ├── utils/api.js          # Axios instance
    │   ├── styles/index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Stripe account (test mode)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Stripe keys
npm run seed     # Populate sample products
npm run dev      # Start server on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev      # Start Vite dev server on http://localhost:3000
```

## 🔑 Demo Credentials

- **Admin:** `admin@iwayshopee.com` / `admin123`
- **User:** Any email + password (6+ chars) works in demo mode

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users` | Register | ❌ |
| POST | `/api/users/login` | Login | ❌ |
| GET | `/api/users/profile` | Get profile | ✅ |
| PUT | `/api/users/profile` | Update profile | ✅ |
| GET | `/api/products` | Get all (search/filter) | ❌ |
| GET | `/api/products/:id` | Get one | ❌ |
| POST | `/api/products` | Create | 👨‍💼 |
| PUT | `/api/products/:id` | Update | 👨‍💼 |
| DELETE | `/api/products/:id` | Delete | 👨‍💼 |
| POST | `/api/products/:id/reviews` | Add review | ✅ |
| POST | `/api/orders` | Create order | ✅ |
| GET | `/api/orders/myorders` | My orders | ✅ |
| PUT | `/api/orders/:id/pay` | Mark paid | ✅ |
| POST | `/api/payment/create-payment-intent` | Stripe intent | ✅ |
| GET | `/api/wishlist` | Get wishlist | ✅ |
| POST | `/api/wishlist/:productId` | Add to wishlist | ✅ |

## 🎨 Design System

**Color Palette (Vibrant Gradients)**
- Purple: `#8b5cf6`
- Pink: `#ec4899`
- Orange: `#f97316`
- Teal: `#14b8a6`
- Hero gradient: `linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)`

**Typography**
- Display: Space Grotesk
- Body: Inter

## 📜 License
MIT © I-WAY Shopee
