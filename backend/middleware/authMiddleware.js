const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ProtectRoute = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    

    // Check Authorization header if cookie is missing
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error in protect route:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = ProtectRoute;
