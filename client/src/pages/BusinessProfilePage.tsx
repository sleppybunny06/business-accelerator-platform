import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const BusinessProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Business Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create and manage your business profile. This page will include forms for business details,
          logo upload, team information, and pitch materials.
        </Typography>
      </Box>
    </Container>
  );
};

export default BusinessProfilePage;