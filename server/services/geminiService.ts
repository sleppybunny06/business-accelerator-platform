import { GoogleGenerativeAI } from '@google/generative-ai';
import { IBusiness } from '../models/Business';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Analyze business pitch and provide comprehensive feedback
   */
  async analyzePitch(business: IBusiness): Promise<{
    marketFitScore: number;
    investorInterestScore: number;
    riskProfile: 'low' | 'medium' | 'high';
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
        Analyze this business pitch and provide detailed feedback:
        
        Business Name: ${business.name}
        Industry: ${business.industry}
        Stage: ${business.stage}
        Description: ${business.description}
        Target Market: ${business.targetMarket}
        Unique Selling Proposition: ${business.uniqueSellingProposition}
        Current Revenue: ${business.currentRevenue || 'Not specified'}
        Projected Revenue: ${business.projectedRevenue || 'Not specified'}
        Funding Needed: ${business.fundingNeeded || 'Not specified'}
        Team Size: ${business.teamSize || 'Not specified'}
        
        Please provide analysis in the following JSON format:
        {
          "marketFitScore": [0-100 score based on market opportunity and fit],
          "investorInterestScore": [0-100 score based on investment attractiveness],
          "riskProfile": ["low", "medium", or "high"],
          "strengths": [array of 3-5 key strengths],
          "weaknesses": [array of 3-5 areas for improvement],
          "recommendations": [array of 3-5 actionable recommendations]
        }
        
        Consider factors like:
        - Market size and opportunity
        - Business model viability
        - Team capabilities
        - Financial projections
        - Competitive advantage
        - Scalability potential
        - Risk factors
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!this.isValidAnalysis(analysis)) {
        throw new Error('Invalid analysis structure from Gemini API');
      }
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing pitch with Gemini:', error);
      throw new Error('Failed to analyze pitch');
    }
  }

  /**
   * Generate marketing strategy suggestions
   */
  async generateMarketingStrategy(business: IBusiness): Promise<{
    strategies: string[];
    channels: string[];
    budget_recommendations: string[];
    timeline: string;
  }> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
        Generate a comprehensive marketing strategy for this business:
        
        Business: ${business.name}
        Industry: ${business.industry}
        Stage: ${business.stage}
        Target Market: ${business.targetMarket}
        Current Revenue: ${business.currentRevenue || 'Startup phase'}
        
        Provide recommendations in JSON format:
        {
          "strategies": [array of 4-6 marketing strategies],
          "channels": [array of recommended marketing channels],
          "budget_recommendations": [array of budget allocation suggestions],
          "timeline": "suggested implementation timeline"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating marketing strategy:', error);
      throw new Error('Failed to generate marketing strategy');
    }
  }

  /**
   * Find matching mentors/investors based on business profile
   */
  async findMatches(business: IBusiness, type: 'mentor' | 'investor'): Promise<{
    criteria: string[];
    recommendations: string[];
    networking_tips: string[];
  }> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
        Suggest ideal ${type} profile for this business:
        
        Business: ${business.name}
        Industry: ${business.industry}
        Stage: ${business.stage}
        Funding Needed: ${business.fundingNeeded || 'Not specified'}
        
        Provide suggestions in JSON format:
        {
          "criteria": [array of 4-6 key criteria for ideal ${type}],
          "recommendations": [array of specific recommendations],
          "networking_tips": [array of networking and approach tips]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error finding matches:', error);
      throw new Error('Failed to find matches');
    }
  }

  /**
   * Analyze funding opportunities
   */
  async analyzeFundingOpportunities(business: IBusiness): Promise<{
    funding_types: string[];
    government_schemes: string[];
    grant_opportunities: string[];
    investor_types: string[];
    preparation_tips: string[];
  }> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
        Analyze funding opportunities for this business:
        
        Business: ${business.name}
        Industry: ${business.industry}
        Stage: ${business.stage}
        Location: ${business.location}
        Funding Needed: ${business.fundingNeeded || 'Not specified'}
        
        Provide analysis in JSON format:
        {
          "funding_types": [array of suitable funding types],
          "government_schemes": [array of potential government schemes],
          "grant_opportunities": [array of grant opportunities],
          "investor_types": [array of suitable investor types],
          "preparation_tips": [array of tips for funding preparation]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error analyzing funding opportunities:', error);
      throw new Error('Failed to analyze funding opportunities');
    }
  }

  /**
   * Generate competitive analysis
   */
  async generateCompetitiveAnalysis(business: IBusiness): Promise<{
    competitors: string[];
    competitive_advantages: string[];
    market_gaps: string[];
    positioning_strategy: string;
  }> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
        Provide competitive analysis for this business:
        
        Business: ${business.name}
        Industry: ${business.industry}
        Target Market: ${business.targetMarket}
        Unique Selling Proposition: ${business.uniqueSellingProposition}
        
        Provide analysis in JSON format:
        {
          "competitors": [array of potential competitors],
          "competitive_advantages": [array of competitive advantages to highlight],
          "market_gaps": [array of identified market gaps],
          "positioning_strategy": "recommended positioning strategy"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating competitive analysis:', error);
      throw new Error('Failed to generate competitive analysis');
    }
  }

  /**
   * Generate a chat response for the AI assistant
   */
  async generateChatResponse(message: string, user?: any, context?: any): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

      const userCtx = user ? `User: ${user.firstName || ''} (role: ${user.role || 'unknown'})` : '';

      const prompt = `
        You are a helpful AI business assistant. Use the user's context when available.
        ${userCtx}
        Context: ${context || 'none'}

        User message:
        ${message}

        Provide a concise, actionable response focused on business advice. Keep it under 400 words.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error('Error generating chat response with Gemini:', error);
      throw new Error('Failed to generate chat response');
    }
  }

  /**
   * Validate analysis response structure
   */
  private isValidAnalysis(analysis: any): boolean {
    return (
      analysis &&
      typeof analysis.marketFitScore === 'number' &&
      typeof analysis.investorInterestScore === 'number' &&
      ['low', 'medium', 'high'].includes(analysis.riskProfile) &&
      Array.isArray(analysis.strengths) &&
      Array.isArray(analysis.weaknesses) &&
      Array.isArray(analysis.recommendations)
    );
  }
}

export default new GeminiService();