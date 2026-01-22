import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Animal color mapping for visual distinction
const getAnimalColor = (animal) => {
  const colorMap = {
    fox: '#ff6f00',
    wildboar: '#795548',
  };
  return colorMap[animal?.toLowerCase()] || '#757575';
};

// Format date and time for display
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return 'N/A';
  
  try {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    };
  } catch (error) {
    return { date: dateTimeStr, time: '' };
  }
};

export default function LastSeenPanel({ data, loading }) {
  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Loading last seen data...
        </Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No last seen data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
        Last Seen
      </Typography>
      <Grid container spacing={2}>
        {data.map((item, index) => {
          const { date, time } = formatDateTime(item.ImageDate);
          const animalColor = getAnimalColor(item.TagName);
          
          return (
            <Grid item xs={12} sm={6} key={index}>
              <Card 
                elevation={2}
                sx={{ 
                  borderLeft: 4, 
                  borderColor: animalColor,
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Chip
                      label={item.TagName}
                      sx={{
                        backgroundColor: animalColor,
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {date}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
