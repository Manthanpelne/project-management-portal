const jwt = require('jsonwebtoken');

// Verify Token
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (id and role) to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

// Check Role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not allowed to access this resource` });
    }
    next();
  };
};

module.exports = { protect, authorize };