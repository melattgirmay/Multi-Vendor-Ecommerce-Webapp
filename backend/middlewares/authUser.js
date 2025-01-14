const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded user data to the request object

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
