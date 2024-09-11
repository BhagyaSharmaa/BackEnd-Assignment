const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "superSecretKey";

async function authenticateUser(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

module.exports = authenticateUser;
