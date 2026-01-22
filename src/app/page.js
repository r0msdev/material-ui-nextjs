'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LastSeenPanel from '@/components/stats/LastSeenPanel';
import DateStatsPanel from '@/components/stats/DateStatsPanel';

export default function Home() {
  const [lastSeenData, setLastSeenData] = React.useState([]);
  const [byDateData, setByDateData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both datasets in parallel
        const [lastSeenResponse, byDateResponse] = await Promise.all([
          fetch('/api/stats/lastseen'),
          fetch('/api/stats/bydate'),
        ]);

        if (!lastSeenResponse.ok || !byDateResponse.ok) {
          throw new Error('Failed to fetch statistics data');
        }

        const lastSeen = await lastSeenResponse.json();
        const byDate = await byDateResponse.json();

        setLastSeenData(lastSeen);
        setByDateData(byDate);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Wildlife Camera Statistics
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  maxHeight: { md: 'calc(100vh - 200px)' },
                  overflow: 'auto'
                }}
              >
                <LastSeenPanel data={lastSeenData} loading={false} />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  maxHeight: { md: 'calc(100vh - 200px)' },
                  overflow: 'auto'
                }}
              >
                <DateStatsPanel data={byDateData} loading={false} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}
