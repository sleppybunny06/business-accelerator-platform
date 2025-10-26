import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, Alert } from '@mui/material';

const PitchAnalysisPage: React.FC = () => {
  const [businessId, setBusinessId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    setError(null);
    setAnalysis(null);

    if (!businessId) {
      setError('Please enter a Business ID.');
      return;
    }

    setLoading(true);

    try {
      // Upload file if present
      if (file) {
        const form = new FormData();
        form.append('pitchVideo', file);

        const uploadRes = await fetch(`/api/businesses/${businessId}/upload`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          body: form
        });

        if (!uploadRes.ok) {
          const body = await uploadRes.json().catch(() => ({}));
          throw new Error(body?.message || 'Upload failed');
        }
      }

      // Request AI analysis
      const analyzeRes = await fetch(`/api/ai/analyze-pitch/${businessId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!analyzeRes.ok) {
        const body = await analyzeRes.json().catch(() => ({}));
        throw new Error(body?.message || 'Analysis request failed');
      }

      const data = await analyzeRes.json();
      setAnalysis(data.analysis || data);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          AI Pitch Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload a pitch video and get AI feedback on market fit, investor appeal, strengths, weaknesses,
          and recommendations.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Business ID"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
          helperText="Enter the business _id to attach the pitch to"
        />

        <input type="file" accept="video/*" onChange={handleFileChange} />

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleUploadAndAnalyze} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Upload & Analyze'}
          </Button>
        </Box>

        {analysis && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">AI Analysis</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 12, borderRadius: 6 }}>
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PitchAnalysisPage;