import mongoose, { Document, Schema } from 'mongoose';

export interface IBusiness extends Document {
  _id: string;
  owner: mongoose.Types.ObjectId;
  name: string;
  description: string;
  tagline?: string;
  logo?: string;
  website?: string;
  
  // Business details
  industry: string;
  stage: 'idea' | 'mvp' | 'early-revenue' | 'scaling' | 'established';
  foundedYear?: number;
  location: string;
  
  // Product/Service
  productType: 'product' | 'service' | 'both';
  targetMarket: string;
  uniqueSellingProposition: string;
  
  // Financials
  currentRevenue?: number;
  projectedRevenue?: number;
  fundingRaised?: number;
  fundingNeeded?: number;
  fundingPurpose?: string;
  
  // Team
  teamSize?: number;
  keyTeamMembers?: {
    name: string;
    role: string;
    experience: string;
  }[];
  
  // Traction
  customers?: number;
  partnerships?: string[];
  achievements?: string[];
  
  // AI Analysis Results
  aiAnalysis?: {
    marketFitScore: number;
    investorInterestScore: number;
    riskProfile: 'low' | 'medium' | 'high';
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    lastAnalyzed: Date;
  };
  
  // Pitch information
  pitchDeck?: string;
  pitchVideo?: string;
  
  // Social proof
  likes: mongoose.Types.ObjectId[];
  views: number;
  bookmarks: mongoose.Types.ObjectId[];
  
  // Status
  isPublished: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSchema = new Schema<IBusiness>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tagline: String,
  logo: String,
  website: String,
  
  industry: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    enum: ['idea', 'mvp', 'early-revenue', 'scaling', 'established'],
    required: true
  },
  foundedYear: Number,
  location: {
    type: String,
    required: true
  },
  
  productType: {
    type: String,
    enum: ['product', 'service', 'both'],
    required: true
  },
  targetMarket: {
    type: String,
    required: true
  },
  uniqueSellingProposition: {
    type: String,
    required: true
  },
  
  currentRevenue: Number,
  projectedRevenue: Number,
  fundingRaised: Number,
  fundingNeeded: Number,
  fundingPurpose: String,
  
  teamSize: Number,
  keyTeamMembers: [{
    name: String,
    role: String,
    experience: String
  }],
  
  customers: Number,
  partnerships: [String],
  achievements: [String],
  
  aiAnalysis: {
    marketFitScore: Number,
    investorInterestScore: Number,
    riskProfile: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    lastAnalyzed: Date
  },
  
  pitchDeck: String,
  pitchVideo: String,
  
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  isPublished: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
BusinessSchema.index({ owner: 1 });
BusinessSchema.index({ industry: 1 });
BusinessSchema.index({ stage: 1 });
BusinessSchema.index({ isPublished: 1 });
BusinessSchema.index({ isFeatured: 1 });
BusinessSchema.index({ 'aiAnalysis.marketFitScore': -1 });
BusinessSchema.index({ 'aiAnalysis.investorInterestScore': -1 });

export const Business = mongoose.model<IBusiness>('Business', BusinessSchema);