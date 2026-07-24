const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'docappoint',
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning]: ${error.message}. Running server with local memory fallback!`);
  }
};

module.exports = connectDB;
