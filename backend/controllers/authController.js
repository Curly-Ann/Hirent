const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const registerUser = async (req, res) => {
  try {
    console.log('[REGISTER] Request received');
    const { name, email, password, role = 'renter' } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Validate role if provided
    if (role && !['renter', 'owner', 'admin'].includes(role)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid role. Must be renter, owner, or admin'
      });
    }

    console.log('[REGISTER] Checking if user exists:', email);
    let user = await User.findOne({ email });
    if (user) {
      console.log('[REGISTER] User already exists:', email);
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    console.log('[REGISTER] Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with specified role
    console.log('[REGISTER] Creating new user with role:', role);
    user = new User({ 
      name, 
      email, 
      password: hashedPassword,
      role: role,
      authProvider: 'email'
    });
    
    console.log('[REGISTER] Saving user to database...');
    await user.save();
    console.log('[REGISTER] User saved successfully:', user._id, 'with role:', user.role);

    // Generate JWT token (7 days)
    console.log('[REGISTER] Generating JWT token...');
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success with token and user data
    console.log('[REGISTER] Sending success response...');
    return res.status(201).json({ 
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        authProvider: user.authProvider
      },
      message: 'Registration successful'
    });
  } catch (err) {
    console.error('[REGISTER] Error occurred:', err.message);
    console.error('[REGISTER] Stack:', err.stack);
    return res.status(500).json({ 
      success: false,
      message: 'Server error during registration: ' + err.message
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    console.log('[LOGIN] Request received');
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    console.log('[LOGIN] Finding user:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[LOGIN] User not found:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Compare passwords
    console.log('[LOGIN] Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[LOGIN] Password mismatch for user:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token (7 days)
    console.log('[LOGIN] Generating JWT token...');
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success with token and user data
    console.log('[LOGIN] Sending success response...');
    return res.status(200).json({ 
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        authProvider: user.authProvider
      },
      message: 'Login successful'
    });
  } catch (err) {
    console.error('[LOGIN] Error occurred:', err.message);
    console.error('[LOGIN] Stack:', err.stack);
    return res.status(500).json({ 
      success: false,
      message: 'Server error during login: ' + err.message
    });
  }
};

// GOOGLE SIGNUP/LOGIN
const googleAuth = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.user;

    // Check if user exists
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        googleId,
        email,
        name,
        avatar,
        authProvider: 'google'
      });
      await user.save();
    } else if (!user.googleId) {
      // Link Google account if user exists with email
      user.googleId = googleId;
      user.authProvider = 'google';
      if (avatar) user.avatar = avatar;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token in query parameter
    const redirectUrl = `http://localhost:3000/auth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }))}`;

    res.redirect(redirectUrl);
  } catch (err) {
    console.error('Google auth error:', err);
    res.redirect(`http://localhost:3000/signup?error=${encodeURIComponent('Google authentication failed')}`);
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, gender, birthday, bio } = req.body;
    const userId = req.user.id; // From authMiddleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Find user and update fields
    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(gender && { gender }),
        ...(birthday && { birthday }),
        ...(bio && { bio })
      },
      { new: true } // Return updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('[UPDATE PROFILE] Profile updated for user:', userId);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        birthday: user.birthday,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
        authProvider: user.authProvider
      }
    });
  } catch (err) {
    console.error('[UPDATE PROFILE] Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error updating profile: ' + err.message
    });
  }
};

// EXPORTS (must match your router!)
module.exports = {
  registerUser,
  loginUser,
  googleAuth,
  updateProfile,
};
