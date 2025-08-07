import React from 'react';
import { Grid, Paper, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { People, Home, LocationCity } from '@mui/icons-material';

function SummaryCards({ safeFilteredItems, sourcingData, uniqueCountries }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={isSmall ? 1 : 2}
      sx={{ mb: isSmall ? 3 : 6 }}
    >
      {[
        {
          label: 'Total Responses',
          value: safeFilteredItems.length,
          icon: <People fontSize="large" color="primary" />,
        },
        {
          label: 'Sourcing from Home',
          value: sourcingData[0].value,
          icon: <Home fontSize="large" sx={{ color: theme.palette.success.main }} />,
        },
        {
          label: 'Not Sourcing from Home',
          value: sourcingData[1].value,
          icon: <LocationCity fontSize="large" sx={{ color: theme.palette.error.main }} />,
        },
        {
          label: 'Unique Countries',
          value: uniqueCountries.length,
          icon: <LocationCity fontSize="large" color="info" />,
        },
      ].map(({ label, value, icon }, i) => (
        <Grid key={i} item xs={12} sm={6} md={3} sx={{ p: isSmall ? 0.5 : 1 }}>
          <Paper
            elevation={4}
            sx={{
              p: isSmall ? 1 : 2,
              display: 'flex',
              alignItems: 'center',
              gap: isSmall ? 1 : 2,
              borderRadius: 2,
              background:
                theme.palette.mode === 'light'
                  ? 'linear-gradient(145deg, #fff, #f0f0f0)'
                  : theme.palette.background.paper,
              boxShadow: theme.shadows[4],
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: theme.shadows[8],
                transform: 'translateY(-4px)',
              },
            }}
          >
            <Box sx={{ flexShrink: 0, color: theme.palette.primary.main }}>{icon}</Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.3, letterSpacing: '0.05em' }}
              >
                {label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                {value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default SummaryCards;
