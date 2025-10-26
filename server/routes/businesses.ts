import express from 'express';
import { body, validationResult } from 'express-validator';
import { Business } from '../models/Business';
import { AuthRequest } from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

/**
 * @route   POST /api/businesses
 * @desc    Create a new business
 * @access  Private (Entrepreneurs only)
 */
router.post('/', [
  body('name').trim().notEmpty().withMessage('Business name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('stage').isIn(['idea', 'mvp', 'early-revenue', 'scaling', 'established']).withMessage('Invalid business stage'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('productType').isIn(['product', 'service', 'both']).withMessage('Invalid product type'),
  body('targetMarket').trim().notEmpty().withMessage('Target market is required'),
  body('uniqueSellingProposition').trim().notEmpty().withMessage('Unique selling proposition is required'),
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

    const businessData = {
      ...req.body,
      owner: (req as any).user?.id,
    };

    const business = new Business(businessData);
    await business.save();

    res.status(201).json({
      success: true,
      message: 'Business created successfully',
      business
    });
  } catch (error) {
    console.error('Create business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/businesses
 * @desc    Get businesses (with filters)
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const { 
      industry, 
      stage, 
      location, 
      featured, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query: any = { isPublished: true };

    if (industry) {
      query.industry = industry;
    }

    if (stage) {
      query.stage = stage;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const businesses = await Business.find(query)
      .populate('owner', 'firstName lastName avatar')
      .select('-__v')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sortOptions);

    const total = await Business.countDocuments(query);

    res.json({
      success: true,
      businesses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get businesses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/businesses/my
 * @desc    Get current user's businesses
 * @access  Private
 */
router.get('/my', async (req, res) => {
  try {
    const businesses = await Business.find({ owner: (req as any).user?.id })
      .populate('owner', 'firstName lastName avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      businesses
    });
  } catch (error) {
    console.error('Get my businesses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/businesses/:id
 * @desc    Get business by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('owner', 'firstName lastName avatar bio')
      .populate('likes', 'firstName lastName avatar')
      .populate('bookmarks', 'firstName lastName avatar');

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Increment view count
    business.views += 1;
    await business.save();

    res.json({
      success: true,
      business
    });
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   PUT /api/businesses/:id
 * @desc    Update business
 * @access  Private (Owner only)
 */
router.put('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user owns the business
  if (business.owner.toString() !== (req as any).user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this business'
      });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('owner', 'firstName lastName avatar');

    res.json({
      success: true,
      message: 'Business updated successfully',
      business: updatedBusiness
    });
  } catch (error) {
    console.error('Update business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   DELETE /api/businesses/:id
 * @desc    Delete business
 * @access  Private (Owner only)
 */
router.delete('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user owns the business
  if (business.owner.toString() !== (req as any).user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this business'
      });
    }

    await Business.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error) {
    console.error('Delete business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/businesses/:id/like
 * @desc    Like/unlike a business
 * @access  Private
 */
router.post('/:id/like', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

  const userId = (req as any).user?.id;
    const isLiked = business.likes.includes(userId as any);

    if (isLiked) {
      // Unlike
      business.likes = business.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      business.likes.push(userId as any);
    }

    await business.save();

    res.json({
      success: true,
      message: isLiked ? 'Business unliked' : 'Business liked',
      likes: business.likes.length,
      isLiked: !isLiked
    });
  } catch (error) {
    console.error('Like business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/businesses/:id/bookmark
 * @desc    Bookmark/unbookmark a business
 * @access  Private
 */
router.post('/:id/bookmark', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

  const userId = (req as any).user?.id;
    const isBookmarked = business.bookmarks.includes(userId as any);

    if (isBookmarked) {
      // Remove bookmark
      business.bookmarks = business.bookmarks.filter(id => id.toString() !== userId);
    } else {
      // Add bookmark
      business.bookmarks.push(userId as any);
    }

    await business.save();

    res.json({
      success: true,
      message: isBookmarked ? 'Bookmark removed' : 'Business bookmarked',
      isBookmarked: !isBookmarked
    });
  } catch (error) {
    console.error('Bookmark business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/businesses/:id/upload
 * @desc    Upload files for business (logo, pitch deck, video)
 * @access  Private (Owner only)
 */
router.post('/:id/upload', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'pitchDeck', maxCount: 1 },
  { name: 'pitchVideo', maxCount: 1 }
]), async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user owns the business
  if (business.owner.toString() !== (req as any).user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to upload files for this business'
      });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updates: any = {};

    if (files.logo && files.logo[0]) {
      updates.logo = `/uploads/${files.logo[0].filename}`;
    }

    if (files.pitchDeck && files.pitchDeck[0]) {
      updates.pitchDeck = `/uploads/${files.pitchDeck[0].filename}`;
    }

    if (files.pitchVideo && files.pitchVideo[0]) {
      updates.pitchVideo = `/uploads/${files.pitchVideo[0].filename}`;
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).populate('owner', 'firstName lastName avatar');

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      business: updatedBusiness
    });
  } catch (error) {
    console.error('Upload files error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;