const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Password must be at least 4 characters long'],
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
