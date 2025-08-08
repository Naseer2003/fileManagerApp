const express = require('express');
const connection = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true // allow cookies/headers
}));

app.use(express.json());

app.use('/api/user', userRoutes);
app.listen(process.env.PORT, () => {
  connection();
  console.log(`server is running on port ${process.env.PORT}`);
});
