import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Badge,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  Psychology,
  People,
  MonetizationOn,
  Add,
  Notifications,
  Star,
  EmojiEvents,
  ChatBubble,
  BusinessCenter,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalConnections: 0,
    totalFunding: 0,
    pitchAnalyses: 0,
  });

  // Mock data for charts
  const progressData = [
    { month: 'Jan', pitches: 2, connections: 5, funding: 10000 },
    { month: 'Feb', pitches: 4, connections: 8, funding: 25000 },
    { month: 'Mar', pitches: 3, connections: 12, funding: 35000 },
    { month: 'Apr', pitches: 6, connections: 15, funding: 50000 },
    { month: 'May', pitches: 5, connections: 20, funding: 75000 },
    { month: 'Jun', pitches: 8, connections: 25, funding: 100000 },
  ];

  const industryData = [
    { name: 'Tech', value: 40, color: '#1976d2' },
    { name: 'Healthcare', value: 25, color: '#dc004e' },
    { name: 'Finance', value: 20, color: '#ff9800' },
    { name: 'Retail', value: 15, color: '#4caf50' },
  ];

  const achievements = [
    { title: 'First Pitch', description: 'Created your first business pitch', earned: true },
    { title: 'AI Analyst', description: 'Used AI pitch analysis', earned: true },
    { title: 'Connector', description: 'Connected with 5 mentors', earned: false },
    { title: 'Funded', description: 'Secured first funding', earned: false },
  ];

  const recentActivities = [
    { type: 'pitch', message: 'AI analysis completed for TechStart', time: '2 hours ago' },
    { type: 'connection', message: 'New mentor connection: Sarah Johnson', time: '1 day ago' },
    { type: 'funding', message: 'New grant opportunity matches your profile', time: '2 days ago' },
    { type: 'community', message: 'Your post received 15 likes', time: '3 days ago' },
  ];

  const upcomingEvents = [
    { title: 'Pitch Competition', date: '2024-01-15', type: 'competition' },
    { title: 'Mentor Session with John Doe', date: '2024-01-12', type: 'mentorship' },
    { title: 'Investor Meetup', date: '2024-01-20', type: 'networking' },
  ];

  const quickActions = [
    { title: 'Create Business Profile', icon: <BusinessCenter />, path: '/business', color: '#1976d2' },
    { title: 'AI Pitch Analysis', icon: <Psychology />, path: '/pitch-analysis', color: '#dc004e' },
    { title: 'Find Mentors', icon: <People />, path: '/mentorship', color: '#ff9800' },
    { title: 'Explore Funding', icon: <MonetizationOn />, path: '/funding', color: '#4caf50' },
  ];

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'entrepreneur':
        return {
          title: 'Entrepreneur Dashboard',
          subtitle: 'Track your startup journey and growth metrics',
        };
      case 'mentor':
        return {
          title: 'Mentor Dashboard',
          subtitle: 'Manage your mentees and track their progress',
        };
      case 'investor':
        return {
          title: 'Investor Dashboard',
          subtitle: 'Discover promising startups and manage your portfolio',
        };
      case 'government':
        return {
          title: 'Government Dashboard',
          subtitle: 'Monitor ecosystem health and funding programs',
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to your business accelerator',
        };
    }
  };

  const dashboardContent = getDashboardContent();

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid>
              <Typography variant="h4" component="h1" gutterBottom>
                {dashboardContent.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {dashboardContent.subtitle}
              </Typography>
            </Grid>
            <Grid>
              <Stack direction="row" spacing={2}>
                <Badge badgeContent={3} color="error">
                  <IconButton color="primary">
                    <Notifications />
                  </IconButton>
                </Badge>
                <Avatar src={user?.avatar}>
                  {user?.firstName?.charAt(0)}
                </Avatar>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Level & Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmojiEvents sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6">Level {user?.level}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {user?.points} points
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size="grow">
                  <Box sx={{ px: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Progress to Level {(user?.level || 1) + 1}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(user?.points || 0) % 1000 / 10}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.3)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'rgba(255,255,255,0.8)',
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {quickActions.map((action, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(action.path)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Box sx={{ color: action.color, mb: 2 }}>
                      {action.icon}
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      {action.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <TrendingUp color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5">
                      {user?.role === 'entrepreneur' ? '3' : '15'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.role === 'entrepreneur' ? 'Businesses' : 'Portfolio'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5">25</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connections
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <MonetizationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5">$125K</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.role === 'entrepreneur' ? 'Funding Raised' : 'Invested'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Psychology color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5">12</Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI Analyses
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Progress Chart */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Progress
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pitches" stroke="#1976d2" strokeWidth={2} />
                    <Line type="monotone" dataKey="connections" stroke="#dc004e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <Stack spacing={2}>
                  {recentActivities.map((activity, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        {activity.type === 'pitch' && <Psychology sx={{ fontSize: 16 }} />}
                        {activity.type === 'connection' && <People sx={{ fontSize: 16 }} />}
                        {activity.type === 'funding' && <MonetizationOn sx={{ fontSize: 16 }} />}
                        {activity.type === 'community' && <ChatBubble sx={{ fontSize: 16 }} />}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">
                          {activity.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Industry Distribution */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Industry Focus
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Achievements
                </Typography>
                <Stack spacing={2}>
                  {achievements.map((achievement, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        opacity: achievement.earned ? 1 : 0.5,
                      }}
                    >
                      <Star
                        sx={{
                          color: achievement.earned ? 'gold' : 'grey.400',
                          fontSize: 24,
                        }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {achievement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {achievement.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <Stack spacing={2}>
                  {upcomingEvents.map((event, index) => (
                    <Box key={index}>
                      <Typography variant="body2" fontWeight="medium">
                        {event.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.date}
                      </Typography>
                      <Chip
                        size="small"
                        label={event.type}
                        sx={{ ml: 1 }}
                        color={event.type === 'competition' ? 'error' : 'primary'}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;