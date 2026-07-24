const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      role: user.role || 'patient'
    },
    process.env.JWT_SECRET || 'docappoint_jwt_secret_key_2026_super_secure',
    { expiresIn: '30d' }
  );
};

// @desc Register user
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, photoUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters and contain at least 1 uppercase and 1 lowercase letter.'
      });
    }

    const emailLower = email.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        const existingUser = await User.findOne({ email: emailLower });
        if (existingUser) {
          return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
          name,
          email: emailLower,
          passwordHash,
          photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
        });

        const token = generateToken(user);
        return res.status(201).json({
          success: true,
          message: 'Registration successful!',
          user: { id: user._id, name: user.name, email: user.email, photoUrl: user.photoUrl, role: user.role },
          token
        });
      } catch (err) {
        console.warn('[DB Register Warning]: fallback to memory');
      }
    }

    // Memory Store
    if (memoryStore.users.some(u => u.email === emailLower)) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = {
      _id: 'u_' + Date.now(),
      name,
      email: emailLower,
      passwordHash,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      role: 'patient'
    };

    memoryStore.users.push(newUser);
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, photoUrl: newUser.photoUrl, role: newUser.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const emailLower = email.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        const user = await User.findOne({ email: emailLower });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.passwordHash);
          if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
          }
          const token = generateToken(user);
          return res.status(200).json({
            success: true,
            message: 'Login successful!',
            user: { id: user._id, name: user.name, email: user.email, photoUrl: user.photoUrl, role: user.role },
            token
          });
        }
      } catch (err) {
        console.warn('[DB Login Warning]: fallback to memory');
      }
    }

    // Memory Store Fallback
    const memUser = memoryStore.users.find(u => u.email === emailLower);
    if (!memUser) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, memUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(memUser);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: { id: memUser._id, name: memUser.name, email: memUser.email, photoUrl: memUser.photoUrl, role: memUser.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Social Login (Google / GitHub)
// @route POST /api/auth/social-login
const socialLogin = async (req, res) => {
  try {
    const { name, email, photoUrl, provider } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Social authentication failed: email required' });
    }

    const emailLower = email.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        let user = await User.findOne({ email: emailLower });
        if (!user) {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash('SocialAuth123!', salt);
          user = await User.create({
            name: name || email.split('@')[0],
            email: emailLower,
            passwordHash,
            photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
          });
        }
        const token = generateToken(user);
        return res.status(200).json({
          success: true,
          message: `Authenticated via ${provider || 'Social Login'}!`,
          user: { id: user._id, name: user.name, email: user.email, photoUrl: user.photoUrl, role: user.role },
          token
        });
      } catch (err) {
        console.warn('[DB Social Warning]: fallback to memory');
      }
    }

    // Memory Fallback
    let memUser = memoryStore.users.find(u => u.email === emailLower);
    if (!memUser) {
      memUser = {
        _id: 'u_' + Date.now(),
        name: name || email.split('@')[0],
        email: emailLower,
        passwordHash: bcrypt.hashSync('SocialAuth123!', 10),
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        role: 'patient'
      };
      memoryStore.users.push(memUser);
    }
    const token = generateToken(memUser);

    res.status(200).json({
      success: true,
      message: `Authenticated via ${provider || 'Social Login'}!`,
      user: { id: memUser._id, name: memUser.name, email: memUser.email, photoUrl: memUser.photoUrl, role: memUser.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get current user profile
// @route GET /api/auth/me
const getMe = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if (user) return res.status(200).json({ success: true, user });
      } catch (err) {
        console.warn('[DB getMe Warning]: fallback to memory');
      }
    }

    const memUser = memoryStore.users.find(u => u._id === req.user.id || u.email === req.user.email);
    if (memUser) {
      const { passwordHash, ...userClean } = memUser;
      return res.status(200).json({ success: true, user: userClean });
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        photoUrl: req.user.photoUrl,
        role: req.user.role || 'patient'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, photoUrl } = req.body;

    if (mongoose.connection.readyState === 1) {
      try {
        const user = await User.findById(req.user.id);
        if (user) {
          if (name) user.name = name;
          if (photoUrl) user.photoUrl = photoUrl;
          await user.save();

          const token = generateToken(user);
          return res.status(200).json({
            success: true,
            message: 'Profile updated successfully!',
            user: { id: user._id, name: user.name, email: user.email, photoUrl: user.photoUrl, role: user.role },
            token
          });
        }
      } catch (err) {
        console.warn('[DB updateProfile Warning]: fallback to memory');
      }
    }

    // Memory Store Fallback
    let memUser = memoryStore.users.find(u => u._id === req.user.id || u.email === req.user.email);
    if (!memUser) {
      memUser = {
        _id: req.user.id || 'u_' + Date.now(),
        name: req.user.name,
        email: req.user.email,
        photoUrl: req.user.photoUrl,
        role: 'patient'
      };
      memoryStore.users.push(memUser);
    }

    if (name) memUser.name = name;
    if (photoUrl) memUser.photoUrl = photoUrl;

    const token = generateToken(memUser);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: { id: memUser._id, name: memUser.name, email: memUser.email, photoUrl: memUser.photoUrl, role: memUser.role },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  socialLogin,
  getMe,
  updateProfile
};
