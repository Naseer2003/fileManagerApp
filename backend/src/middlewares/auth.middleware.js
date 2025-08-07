const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Invalid or expires token' });
  }
};
module.exports = authMiddleware;
