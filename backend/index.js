const express = require('express');
const cors = require('cors');
const connection = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');
const fileRoutes = require('./src/routes/file.routes');
const app = express();

require('dotenv').config({ path: '.env', debug: true }); // Added debug

// Validate environment variables
if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_KEY ||
  !process.env.CLOUD_SECRET
) {
  console.error('Missing Cloudinary environment variables');
  process.exit(1);
}

app.use(
  cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/files', fileRoutes);

app.listen(process.env.PORT, () => {
  connection();
  console.log(`server is running on port ${process.env.PORT}`);
});
