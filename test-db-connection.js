require('dotenv').config();
const connectDB = require('./config/db');

connectDB()
  .then(() => {
    console.log('CONNECTED');
    process.exit(0);
  })
  .catch((err) => {
    console.error('ERROR', err.message);
    process.exit(1);
  });
