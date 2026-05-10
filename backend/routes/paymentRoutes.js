const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');

const stripe = process.env.STRIPE_SECRET_KEY
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : null;

// @desc Create Stripe payment intent
router.post('/create-payment-intent', protect, asyncHandler(async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  if (!stripe) {
    // Mock payment intent for demo when Stripe is not configured
    return res.json({
      clientSecret: 'demo_pi_secret_' + Date.now(),
      mock: true,
      message: 'Stripe not configured - using mock mode'
    });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}));

module.exports = router;
