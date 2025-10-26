import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const FundingPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Funding Opportunities</Typography>
      <Typography variant="body1" color="text.secondary">
        Explore grants, competitions, and funding programs. Get AI assistance with applications.
      </Typography>
    </Container>
  );
};

export default FundingPage;