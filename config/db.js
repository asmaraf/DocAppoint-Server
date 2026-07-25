const mongoose = require('mongoose');
const dns = require('dns');

// Force Node to use a stable public DNS resolver for Atlas SRV lookups.
// This avoids local DNS resolver failures that can cause querySrv ECONNREFUSED.
dns.setServers(['8.8.8.8', '8.8.4.4']);
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[MongoDB Connection Warning]: No MONGO_URI or MONGODB_URI found in environment variables.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: 'docappoint',
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning]: ${error.message}. Running server with local memory fallback!`);
  }
};

module.exports = connectDB;
