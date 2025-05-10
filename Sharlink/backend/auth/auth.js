const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

const isSignUpLoginAnable = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next(); // no token → can go to signup/login
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(403).json({ message: 'Already logged in.' });
  } catch (err) {
    next(); // token exists but invalid → let them re-login
  }
};

module.exports = {
  isLoggedIn,
  isSignUpLoginAnable,
};