'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { getAnimalColor } from '@/utils/animalColors';
import { useTranslations } from '@/contexts/TranslationsContext';

// Format time from ISO string
const formatTime = (timeStr, locale = 'en-US') => {
  if (!timeStr) return 'N/A';
  
  try {
    // Handle "HH:MM" format (already grouped by hour)
    if (timeStr.match(/^\d{2}:\d{2}$/)) {
      return timeStr;
    }
    
    // Handle "HH:MM:SS.sssZ" format
    if (timeStr.includes('Z') && !timeStr.includes('T')) {
      const timePart = timeStr.split('Z')[0];
      return timePart.substring(0, 8); // HH:MM:SS
    }
    
    // Handle full ISO timestamp
    const date = new Date(timeStr);
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  } catch (error) {
    return timeStr;
  }
};

export default function StatDetailsTable({ details }) {
  const { t, locale } = useTranslations();
  
  if (!details || details.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
        {t('no_details_available')}
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" aria-label="statistics details table">
        <TableHead>
          <TableRow>
            <TableCell>{t('time')}</TableCell>
            <TableCell>{t('animal')}</TableCell>
            <TableCell align="right">{t('images_total')}</TableCell>
            <TableCell align="right">{t('tags_max')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formatTime(detail.ImageDate, locale)}
              </TableCell>
              <TableCell>
                <Chip
                  label={detail.ImageTag}
                  size="small"
                  sx={{
                    backgroundColor: getAnimalColor(detail.ImageTag),
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </TableCell>
              <TableCell align="right">{detail.ImageCount}</TableCell>
              <TableCell align="right">{detail.NumTags}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
