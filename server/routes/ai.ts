import express from 'express';
import { body, validationResult } from 'express-validator';
import { Business } from '../models/Business';
import { User } from '../models/User';
import geminiService from '../services/geminiService';

const router = express.Router();

/**
 * @route   POST /api/ai/analyze-pitch/:businessId
 * @desc    Analyze business pitch using AI
 * @access  Private
 */
router.post('/analyze-pitch/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
  const userId = (req as any).user?.id;

    // Find the business
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user owns the business or is authorized
  if (business.owner.toString() !== userId && (req as any).user?.role !== 'government') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to analyze this business'
      });
    }

    // Analyze the pitch using Gemini AI
    const analysis = await geminiService.analyzePitch(business);

    // Update business with AI analysis
    business.aiAnalysis = {
      ...analysis,
      lastAnalyzed: new Date()
    };
    await business.save();

    // Award points to the user for using AI analysis
    if ((req as any).user?.role === 'entrepreneur') {
      const user = await User.findById(userId as any);
      if (user) {
        user.points += 10;
        await user.save();
      }
    }

    res.json({
      success: true,
      message: 'Pitch analysis completed',
      analysis
    });

  } catch (error) {
    console.error('AI pitch analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze pitch'
    });
  }
});

/**
 * @route   POST /api/ai/marketing-strategy/:businessId
 * @desc    Generate marketing strategy using AI
 * @access  Private
 */
router.post('/marketing-strategy/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
  const userId = (req as any).user?.id;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

  if (business.owner.toString() !== userId && (req as any).user?.role !== 'mentor') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const strategy = await geminiService.generateMarketingStrategy(business);

    res.json({
      success: true,
      strategy
    });

  } catch (error) {
    console.error('Marketing strategy generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate marketing strategy'
    });
  }
});

/**
 * @route   POST /api/ai/find-matches/:businessId
 * @desc    Find matching mentors or investors
 * @access  Private
 */
router.post('/find-matches/:businessId', [
  body('type').isIn(['mentor', 'investor'])
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

    const { businessId } = req.params;
    const { type } = req.body;
  const userId = (req as any).user?.id;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    if (business.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const matches = await geminiService.findMatches(business, type);

    // Also find actual users that match the criteria
    const query: any = { role: type };
    if (type === 'mentor') {
      query.expertise = { $in: [business.industry] };
    } else if (type === 'investor') {
      query.investmentStage = { $in: [business.stage] };
      if (business.fundingNeeded) {
        query['investmentRange.min'] = { $lte: business.fundingNeeded };
        query['investmentRange.max'] = { $gte: business.fundingNeeded };
      }
    }

    const actualMatches = await User.find(query)
      .select('firstName lastName avatar bio expertise investmentRange')
      .limit(10);

    res.json({
      success: true,
      aiRecommendations: matches,
      actualMatches
    });

  } catch (error) {
    console.error('Find matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find matches'
    });
  }
});

/**
 * @route   POST /api/ai/funding-opportunities/:businessId
 * @desc    Analyze funding opportunities
 * @access  Private
 */
router.post('/funding-opportunities/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
  const userId = (req as any).user?.id;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    if (business.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const opportunities = await geminiService.analyzeFundingOpportunities(business);

    res.json({
      success: true,
      opportunities
    });

  } catch (error) {
    console.error('Funding opportunities analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze funding opportunities'
    });
  }
});

/**
 * @route   POST /api/ai/competitive-analysis/:businessId
 * @desc    Generate competitive analysis
 * @access  Private
 */
router.post('/competitive-analysis/:businessId', async (req, res) => {
  try {
  const { businessId } = req.params;
  const userId = (req as any).user?.id;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

  if (business.owner.toString() !== userId && (req as any).user?.role !== 'mentor') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const analysis = await geminiService.generateCompetitiveAnalysis(business);

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Competitive analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate competitive analysis'
    });
  }
});

/**
 * @route   POST /api/ai/chat
 * @desc    AI Chat Assistant
 * @access  Private
 */
router.post('/chat', [
  body('message').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

  const { message, context } = req.body;
  const userId = (req as any).user?.id;

  // Get user context for personalized responses
  const user = await User.findById(userId as any).select('firstName role industries expertise');
    
    // For now, we'll create a simple chat response
    // In production, you'd want to maintain conversation history
  // Use the gemini service to generate the chat response
  const chatResponse = await geminiService.generateChatResponse(message, user, context);

    res.json({
      success: true,
      response: chatResponse
    });

  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message'
    });
  }
});

export default router;