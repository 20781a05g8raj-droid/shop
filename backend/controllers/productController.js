const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc Fetch all products with search/filter/pagination
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const category = req.query.category && req.query.category !== 'all'
    ? { category: req.query.category }
    : {};
  const minPrice = req.query.minPrice ? { price: { $gte: Number(req.query.minPrice) } } : {};
  const maxPrice = req.query.maxPrice ? { price: { ...(minPrice.price || {}), $lte: Number(req.query.maxPrice) } } : {};
  const minRating = req.query.minRating ? { rating: { $gte: Number(req.query.minRating) } } : {};

  const filter = { ...keyword, ...category, ...minPrice, ...maxPrice, ...minRating };

  let sort = {};
  switch (req.query.sort) {
    case 'price-asc': sort = { price: 1 }; break;
    case 'price-desc': sort = { price: -1 }; break;
    case 'rating': sort = { rating: -1 }; break;
    case 'newest': sort = { createdAt: -1 }; break;
    default: sort = { createdAt: -1 };
  }

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else { res.status(404); throw new Error('Product not found'); }
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).limit(8);
  res.json(products);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name || 'Sample Product',
    price: req.body.price || 0,
    user: req.user._id,
    image: req.body.image || '/images/sample.jpg',
    brand: req.body.brand || 'Sample',
    category: req.body.category || 'Other',
    countInStock: req.body.countInStock || 0,
    numReviews: 0,
    description: req.body.description || 'Sample description'
  });
  const created = await product.save();
  res.status(201).json(created);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else { res.status(404); throw new Error('Product not found'); }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else { res.status(404); throw new Error('Product not found'); }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) { res.status(400); throw new Error('Already reviewed'); }
    const review = { name: req.user.name, rating: Number(rating), comment, user: req.user._id };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else { res.status(404); throw new Error('Product not found'); }
});

module.exports = {
  getProducts, getProductById, getFeaturedProducts, getCategories,
  createProduct, updateProduct, deleteProduct, createProductReview
};
