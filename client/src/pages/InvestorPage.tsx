import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const InvestorPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Investor Network</Typography>
      <Typography variant="body1" color="text.secondary">
        Discover and connect with potential investors. Browse investor profiles and funding opportunities.
      </Typography>
    </Container>
  );
};

export default InvestorPage;