const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected!');
  } catch (error) {
    console.log('connection failed', error);
  }
};
module.exports = connection;
