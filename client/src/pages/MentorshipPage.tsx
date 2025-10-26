import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MentorshipPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Mentorship Hub</Typography>
      <Typography variant="body1" color="text.secondary">
        Connect with experienced mentors and advisors. Find the right guidance for your business journey.
      </Typography>
    </Container>
  );
};

export default MentorshipPage;