const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return next(new ErrorResponse('Authorization denied: No token provided', 401));
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user from payload
        req.user = decoded.user;
        next();
    } catch (err) {
        next(new ErrorResponse('Authorization denied: Invalid token', 401));
    }
};
