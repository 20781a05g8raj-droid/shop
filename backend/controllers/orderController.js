const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400); throw new Error('No order items');
  }
  const order = new Order({
    user: req.user._id, orderItems, shippingAddress, paymentMethod,
    itemsPrice, taxPrice, shippingPrice, totalPrice
  });
  const created = await order.save();
  res.status(201).json(created);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) res.json(order);
  else { res.status(404); throw new Error('Order not found'); }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'Processing';
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };
    const updated = await order.save();
    res.json(updated);
  } else { res.status(404); throw new Error('Order not found'); }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'Delivered';
    const updated = await order.save();
    res.json(updated);
  } else { res.status(404); throw new Error('Order not found'); }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name').sort('-createdAt');
  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = req.body.status || order.status;
    if (order.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    const updated = await order.save();
    res.json(updated);
  } else { res.status(404); throw new Error('Order not found'); }
});

module.exports = {
  addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered,
  getMyOrders, getOrders, updateOrderStatus
};
