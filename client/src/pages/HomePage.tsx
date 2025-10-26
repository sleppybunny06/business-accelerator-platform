import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
  Avatar,
  Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  RocketLaunch,
  Psychology,
  TrendingUp,
  Groups,
  MonetizationOn,
  Analytics,
  EmojiEvents,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Psychology color="primary" sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Pitch Analysis',
      description: 'Get instant feedback on your business pitch with our advanced AI that analyzes market fit, investor appeal, and risk factors.',
    },
    {
      icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />,
      title: 'Smart Growth Strategies',
      description: 'Receive personalized marketing strategies, financial insights, and competitive analysis to accelerate your growth.',
    },
    {
      icon: <MonetizationOn color="primary" sx={{ fontSize: 40 }} />,
      title: 'Funding Discovery',
      description: 'Discover government schemes, grants, and investor opportunities tailored to your business stage and industry.',
    },
    {
      icon: <Groups color="primary" sx={{ fontSize: 40 }} />,
      title: 'Mentor & Investor Matching',
      description: 'Connect with the right mentors and investors based on your niche, funding stage, and geographical location.',
    },
    {
      icon: <Analytics color="primary" sx={{ fontSize: 40 }} />,
      title: 'Real-time Analytics',
      description: 'Track your progress with AI-powered dashboards and get weekly insights into your business performance.',
    },
    {
      icon: <EmojiEvents color="primary" sx={{ fontSize: 40 }} />,
      title: 'Gamified Community',
      description: 'Earn points, unlock badges, and compete on leaderboards while building your business with like-minded entrepreneurs.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, EcoTech Solutions',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
      text: 'This platform helped me secure $500K in funding within 3 months. The AI pitch analysis was spot-on!',
    },
    {
      name: 'Marcus Johnson',
      role: 'Founder, HealthApp',
      avatar: '/avatars/marcus.jpg',
      rating: 5,
      text: 'The mentor matching feature connected me with exactly the right advisor for my healthcare startup.',
    },
    {
      name: 'Priya Patel',
      role: 'Co-founder, FinanceFlow',
      avatar: '/avatars/priya.jpg',
      rating: 5,
      text: 'The AI-generated marketing strategies increased our user acquisition by 200% in just 2 months.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Entrepreneurs' },
    { number: '500+', label: 'Success Stories' },
    { number: '$50M+', label: 'Funding Raised' },
    { number: '1,000+', label: 'Mentors & Investors' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                  Your AI-Powered Business Accelerator
                </Typography>
                <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
                  Launch, optimize, and scale your business with the power of AI. 
                  Get matched with investors, mentors, and funding opportunities.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                    onClick={() => user ? navigate('/dashboard') : navigate('/register')}
                  >
                    {user ? 'Go to Dashboard' : 'Start Your Journey'}
                    <ArrowForward sx={{ ml: 1 }} />
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                    component={Link}
                    to="#features"
                  >
                    Learn More
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <RocketLaunch sx={{ fontSize: 200, opacity: 0.8 }} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box textAlign="center">
                    <Typography variant="h3" component="div" color="primary" fontWeight="bold">
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
              Everything You Need to Succeed
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
              Our AI-powered platform provides comprehensive tools for entrepreneurs at every stage
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
              Success Stories
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
              See how entrepreneurs like you are achieving their dreams
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={testimonial.avatar} sx={{ mr: 2 }}>
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        "{testimonial.text}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
              Ready to Accelerate Your Business?
            </Typography>
            <Typography variant="h6" textAlign="center" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of entrepreneurs who are already using AI to grow their businesses
            </Typography>
            <Box textAlign="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                }}
                onClick={() => user ? navigate('/dashboard') : navigate('/register')}
              >
                {user ? 'Go to Dashboard' : 'Get Started Now'}
                <ArrowForward sx={{ ml: 1 }} />
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;