const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: 'User already exists with this email' });
    }
    const hash = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hash,
      role,
    });

    return res
      .status(201)
      .json({ message: 'User signed up successfully', user });
  } catch (error) {
    console.log('SignUp Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
    res.status(200).json({ message: ' Login Successful', token });
  } catch (error) {
    console.log('Login Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Log out successful' });
  } catch (error) {
    console.log('Logout Error:', error.message);
    res.status(500).json({ message: 'Internal server' });
  }
};
const allUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log('All users error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const protectedRoute = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: 'This protected data only access particular role' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { login, signup, allUsers, protectedRoute, logout };
