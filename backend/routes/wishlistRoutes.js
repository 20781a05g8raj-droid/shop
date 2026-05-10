const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');

// Get user's wishlist
router.get('/', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist || []);
}));

// Add to wishlist
router.post('/:productId', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.wishlist.includes(req.params.productId)) {
    user.wishlist.push(req.params.productId);
    await user.save();
  }
  res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
}));

// Remove from wishlist
router.delete('/:productId', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
  await user.save();
  res.json({ message: 'Removed from wishlist', wishlist: user.wishlist });
}));

module.exports = router;
