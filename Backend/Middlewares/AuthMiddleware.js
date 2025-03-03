const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sfasdfasgasfsdfasdf';

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is provided
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user information to the request object
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};
