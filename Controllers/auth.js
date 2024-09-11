const UserModel = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "superSecretKey";

async function registerUser(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username, email, password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ success: true, message: `Account for ${username} created successfully` });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error while creating user account' });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) return res.status(400).json({ success: false, message: 'Invalid email address' });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Incorrect email or password' });
        }
        const token = jwt.sign(
            { email: existingUser.email, userId: existingUser._id },
            JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );
        return res.status(200).json({ success: true, message: 'Successfully logged in', token });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error during login' });
    }
}

module.exports = { registerUser, loginUser };
