const mongoose = require('mongoose');
const { DB_URI, DB_OPTIONS } = require('./index');

const connectDB = async () => {
  try {
    console.log('Connecting to Database...');
    await mongoose.connect(DB_URI, DB_OPTIONS);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
