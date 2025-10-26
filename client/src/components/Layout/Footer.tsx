import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'grey.100',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              BusinessAI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered business acceleration platform helping entrepreneurs succeed.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Features
            </Typography>
            <Link href="#" variant="body2" display="block">
              AI Pitch Analysis
            </Link>
            <Link href="#" variant="body2" display="block">
              Mentor Matching
            </Link>
            <Link href="#" variant="body2" display="block">
              Funding Discovery
            </Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Link href="#" variant="body2" display="block">
              About Us
            </Link>
            <Link href="#" variant="body2" display="block">
              Contact
            </Link>
            <Link href="#" variant="body2" display="block">
              Privacy Policy
            </Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Link href="#" variant="body2" display="block">
              Help Center
            </Link>
            <Link href="#" variant="body2" display="block">
              Community
            </Link>
            <Link href="#" variant="body2" display="block">
              Blog
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            BusinessAI Platform {new Date().getFullYear()}
            {'. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;