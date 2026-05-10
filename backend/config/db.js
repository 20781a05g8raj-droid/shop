const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/iway-shopee');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Error: ${err.message}`);
    // Don't exit - allow running without DB for demo
  }
};

module.exports = connectDB;
