import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CommunityPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Community Hub</Typography>
      <Typography variant="body1" color="text.secondary">
        Connect with fellow entrepreneurs, share experiences, and participate in discussions.
      </Typography>
    </Container>
  );
};

export default CommunityPage;