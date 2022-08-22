const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

// @route POST api/auth/register
// @desc Register user
// @access public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //Simple validation
    if (!username || !password) {
        res.status(400).json({ success: false, message: 'Missing username and/or password' });
    }
    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ success: false, message: 'Username already taken' });
        }

        const hasdedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hasdedPassword,
        });

        await newUser.save();

        // return Token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ succes: true, message: 'User created successfully', accessToken: accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ succes: false, message: 'Internal server error' });
    }
});

// @route POST api/auth/login
// @desc Login user
// @access public

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password) {
        res.status(400).json({ success: false, message: 'Missing username and/or password' });
    }

    try {
        // check for existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' });
        }

        // Username found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' });
        }

        // return Token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ succes: true, message: 'Logged in successfully', accessToken: accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ succes: false, message: 'Internal server error' });
    }
});

module.exports = router;
