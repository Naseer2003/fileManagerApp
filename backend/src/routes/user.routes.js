const express = require('express');
const userRouter = express.Router();
const {
  login,
  signup,
  allUsers,
  protectedRoute,
  logout,
} = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
userRouter.post('/register', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/all_users', allUsers);
userRouter.get('/protected', authMiddleware, checkRole('user'), protectedRoute);
module.exports = userRouter;
