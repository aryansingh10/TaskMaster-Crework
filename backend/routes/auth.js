const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');
const sendEmail = require('../middleware/mailer');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Create a new user
        const user = new User({ email });

        // Register user with passport-local-mongoose
        await User.register(user, password);

        // Send welcome email (non-blocking)
        sendEmail(email, 'Welcome to TaskMaster', 'Thank you for signing up!', '<h1>Thank you for signing up!</h1>')
            .then(emailInfo => {
                console.log('Email response:', emailInfo);
            })
            .catch(emailError => {
                console.error('Email sending error:', emailError); // Log error but don't block registration
            });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        if (error.name === 'UserExistsError') {
            return res.status(400).json({ message: 'A user with the given email is already registered' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!user) {
            return res.status(400).json({ message: info ? info.message : 'Login failed' });
        }

        req.logIn(user, { session: false }, (err) => {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ message: 'Login error' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ user, token });
        });
    })(req, res, next);
});

module.exports = router;
