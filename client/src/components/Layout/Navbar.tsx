import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  RocketLaunch,
  Notifications,
  AccountCircle,
  Dashboard,
  Business,
  Psychology,
  People,
  MonetizationOn,
  Groups,
  Chat,
  ExitToApp,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseNotificationMenu = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseProfileMenu();
    navigate('/');
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Business', path: '/business', icon: <Business /> },
    { label: 'AI Analysis', path: '/pitch-analysis', icon: <Psychology /> },
    { label: 'Mentorship', path: '/mentorship', icon: <People /> },
    { label: 'Investors', path: '/investors', icon: <MonetizationOn /> },
    { label: 'Funding', path: '/funding', icon: <MonetizationOn /> },
    { label: 'Community', path: '/community', icon: <Groups /> },
    { label: 'Chat', path: '/chat', icon: <Chat /> },
  ];

  const mockNotifications = [
    { id: 1, message: 'New mentor connection request', time: '2 mins ago', unread: true },
    { id: 2, message: 'AI analysis completed', time: '1 hour ago', unread: true },
    { id: 3, message: 'New funding opportunity', time: '3 hours ago', unread: false },
  ];

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0, mr: 4 }}>
          <RocketLaunch sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            BusinessAI
          </Typography>
        </Box>

        {/* Navigation Items - Desktop */}
        {user && (
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  mx: 1,
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  borderBottom: location.pathname === item.path ? 2 : 0,
                  borderColor: 'primary.main',
                  borderRadius: 0,
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Right Side */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton
                  onClick={handleNotificationMenu}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleProfileMenu}>
                    <Avatar src={user.avatar} sx={{ width: 32, height: 32 }}>
                      {user.firstName?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
                Login
              </Button>
              <Button variant="contained" component={Link} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseProfileMenu}
          onClick={handleCloseProfileMenu}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => navigate('/profile')}>
            <AccountCircle sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate('/dashboard')}>
            <Dashboard sx={{ mr: 2 }} />
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleCloseNotificationMenu}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 300,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          {mockNotifications.map((notification) => (
            <MenuItem key={notification.id} sx={{ py: 2, borderBottom: 1, borderColor: 'grey.100' }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: notification.unread ? 600 : 400 }}>
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;