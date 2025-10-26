import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'entrepreneur' | 'mentor' | 'investor' | 'government';
  isVerified: boolean;
  googleId?: string;
  
  // Profile information
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  
  // Entrepreneur specific
  businessStage?: 'idea' | 'mvp' | 'early-revenue' | 'scaling' | 'established';
  industries?: string[];
  fundingNeed?: number;
  
  // Mentor specific
  expertise?: string[];
  yearsExperience?: number;
  mentorshipPrice?: number;
  availability?: {
    timezone: string;
    slots: string[];
  };
  
  // Investor specific
  investmentRange?: {
    min: number;
    max: number;
  };
  investmentStage?: string[];
  portfolioSize?: number;
  
  // Gamification
  points: number;
  level: number;
  badges: string[];
  achievements: {
    type: string;
    earnedAt: Date;
    description: string;
  }[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  getFullName(): string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: String,
  role: {
    type: String,
    enum: ['entrepreneur', 'mentor', 'investor', 'government'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  googleId: String,
  
  // Profile
  bio: String,
  location: String,
  phone: String,
  website: String,
  linkedin: String,
  
  // Entrepreneur specific
  businessStage: {
    type: String,
    enum: ['idea', 'mvp', 'early-revenue', 'scaling', 'established']
  },
  industries: [String],
  fundingNeed: Number,
  
  // Mentor specific
  expertise: [String],
  yearsExperience: Number,
  mentorshipPrice: Number,
  availability: {
    timezone: String,
    slots: [String]
  },
  
  // Investor specific
  investmentRange: {
    min: Number,
    max: Number
  },
  investmentStage: [String],
  portfolioSize: Number,
  
  // Gamification
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [String],
  achievements: [{
    type: String,
    earnedAt: Date,
    description: String
  }],
  
  lastLoginAt: Date
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ industries: 1 });
UserSchema.index({ expertise: 1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Get full name method
UserSchema.methods.getFullName = function(): string {
  return `${this.firstName} ${this.lastName}`;
};

export const User = mongoose.model<IUser>('User', UserSchema);