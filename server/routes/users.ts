import express from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/User';
// import { AuthRequest } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById((req as any).user?.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', [
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('bio').optional().trim(),
  body('location').optional().trim(),
  body('phone').optional().trim(),
  body('website').optional().trim(),
  body('linkedin').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const userId = (req as any).user?.id;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/users/search
 * @desc    Search users by role and filters
 * @access  Private
 */
router.get('/search', async (req, res) => {
  try {
    const { role, industry, expertise, location, page = 1, limit = 10 } = req.query;
    
    const query: any = {};
    
    if (role) {
      query.role = role;
    }
    
    if (industry) {
      query.industries = { $in: [industry] };
    }
    
    if (expertise) {
      query.expertise = { $in: [expertise] };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const users = await User.find(query)
      .select('firstName lastName avatar bio role industries expertise location investmentRange')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ points: -1, createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/users/points
 * @desc    Add points to user (for gamification)
 * @access  Private
 */
router.post('/points', [
  body('points').isInt({ min: 1 }).withMessage('Points must be a positive integer'),
  body('action').notEmpty().withMessage('Action is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { points, action } = req.body;
    const userId = (req as any).user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add points
    user.points += points;
    
    // Calculate level (every 1000 points = 1 level)
    user.level = Math.floor(user.points / 1000) + 1;

    await user.save();

    res.json({
      success: true,
      message: 'Points added successfully',
      user: {
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    console.error('Add points error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;