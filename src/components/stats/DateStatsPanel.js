import * as React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StatDetailsTable from './StatDetailsTable';

// Format date for display
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    return dateStr;
  }
};

// Group stat details by hour and animal
const groupByHourAndAnimal = (details) => {
  if (!details || details.length === 0) return [];

  const grouped = {};

  details.forEach((detail) => {
    // Extract hour from time string
    let hour = '';
    try {
      if (detail.ImageDate.includes('Z') && !detail.ImageDate.includes('T')) {
        // Format: "HH:MM:SS.sssZ"
        hour = detail.ImageDate.substring(0, 2);
      } else {
        // Full ISO timestamp
        const date = new Date(detail.ImageDate);
        hour = date.getHours().toString().padStart(2, '0');
      }
    } catch (error) {
      hour = '00';
    }

    const hourKey = `${hour}:00`;
    const animal = detail.ImageTag;
    const key = `${hourKey}_${animal}`;

    if (!grouped[key]) {
      grouped[key] = {
        ImageDate: hourKey,
        ImageTag: animal,
        ImageCount: 0,
        NumTags: 0,
      };
    }

    grouped[key].ImageCount += detail.ImageCount;
    grouped[key].NumTags = Math.max(grouped[key].NumTags, detail.NumTags);
  });

  // Convert to array and sort by hour then animal
  return Object.values(grouped).sort((a, b) => {
    const hourCompare = a.ImageDate.localeCompare(b.ImageDate);
    if (hourCompare !== 0) return hourCompare;
    return a.ImageTag.localeCompare(b.ImageTag);
  });
};

export default function DateStatsPanel({ data, loading }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Loading statistics by date...
        </Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No date statistics available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
        Statistics by Date
      </Typography>
      {data.map((item, index) => {
        const groupedDetails = groupByHourAndAnimal(item.StatDetails);
        
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            elevation={2}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                <DateRangeIcon color="primary" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {formatDate(item.ImageDate)}
                  </Typography>
                </Box>
                <Chip
                  label={`${item.NumImages} images`}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <StatDetailsTable details={groupedDetails} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
