const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // load env variables

// Validate env variables before config
if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_KEY ||
  !process.env.CLOUD_SECRET
) {
  console.error('❌ Cloudinary environment variables missing');
  process.exit(1); // Stop the server if config is incomplete
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

console.log('✅ Cloudinary connected successfully');

module.exports = cloudinary;
