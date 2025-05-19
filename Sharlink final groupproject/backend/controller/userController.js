const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign up or add new user in the DB
const signUp = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    // Input validation
    if (!nickname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      nickname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, nickname: newUser.nickname },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set token in HttpOnly cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day optionally
    });

    // Return user data
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        nickname: newUser.nickname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Log in user
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, nickname: existingUser.nickname },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookies
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day optionally
    });

    res.cookie(
      'userInfo',
      JSON.stringify({
        id: existingUser._id,
        nickname: existingUser.nickname,
        email: existingUser.email,
      }),
      {
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day optionally
      }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: existingUser._id,
        nickname: existingUser.nickname,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout user
const logOut = async (req, res) => {
  try {
    // Clear the cookies
    res.clearCookie('authToken');
    res.clearCookie('userInfo');

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user page (only for authenticated users)
const userPage = async (req, res) => {
  try {
    // Get user ID from token, set in middleware (userAuth.isLoggedIn)
    const userId = req.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User page loaded successfully',
      user,
    });
  } catch (error) {
    console.error('User page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signUp,
  logIn,
  logOut,
  userPage,
};
