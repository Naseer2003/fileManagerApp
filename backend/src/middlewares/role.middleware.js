const checkRole = (...allowed) => {
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied-No Access' });
    }
    next();
  };
};

module.exports = checkRole;
