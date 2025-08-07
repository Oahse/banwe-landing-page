import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { decryptData } from '../utils';

import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

import { CheckCircle, Cancel, Home, LocationCity, People, FilterList } from '@mui/icons-material';
import {backendUrl} from '../constants.jsx';
const COLOR_PALETTE = ['#d32f2f', '#1976d2', '#388e3c', '#fbc02d', '#7b1fa2', '#f57c00'];

function SurveyAnalytics() {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [sourcingFromHomeFilter, setSourcingFromHomeFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${backendUrl}survey-items/`)
      .then(res => {
        const decrypted = res.data.data // decryptData(res.data.data);
        setItems(decrypted);
        setFilteredItems(decrypted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching survey items:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!items) return;

    let filtered = [...items];
    if (ageGroupFilter) {
      filtered = filtered.filter(item => item.age_group === ageGroupFilter);
    }
    if (countryFilter) {
      filtered = filtered.filter(item => item.residence_country === countryFilter);
    }
    if (sourcingFromHomeFilter !== null) {
      filtered = filtered.filter(item => item.sourcing_from_home === sourcingFromHomeFilter);
    }
    setFilteredItems(filtered);
  }, [ageGroupFilter, countryFilter, sourcingFromHomeFilter, items]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography variant="h6" color="textSecondary">No survey data available</Typography>
      </Box>
    );
  }

  const safeFilteredItems = filteredItems || [];

  // Helpers for badges with colors for age groups & sourcing
  const ageGroupColors = {
    '18-24': 'primary',
    '25-34': 'success',
    '35-44': 'warning',
    '45-54': 'info',
    '55+': 'error',
    Unknown: 'default',
  };

  const sourcingLabels = {
    true: { label: 'From Home', color: 'success', icon: <Home fontSize="small" /> },
    false: { label: 'Not From Home', color: 'error', icon: <LocationCity fontSize="small" /> },
  };

  // Aggregate data for charts
  const ageGroupData = safeFilteredItems.reduce((acc, item) => {
    const key = item.age_group || 'Unknown';
    const found = acc.find(e => e.name === key);
    if (found) found.value++;
    else acc.push({ name: key, value: 1 });
    return acc;
  }, []);

  const countryData = safeFilteredItems.reduce((acc, item) => {
    const key = item.residence_country || 'Unknown';
    const found = acc.find(e => e.name === key);
    if (found) found.value++;
    else acc.push({ name: key, value: 1 });
    return acc;
  }, []);

  const sourcingData = [
    { name: 'From Home', value: safeFilteredItems.filter(i => i.sourcing_from_home).length },
    { name: 'Not From Home', value: safeFilteredItems.filter(i => !i.sourcing_from_home).length },
  ];

  // Unique filter options
  const uniqueAgeGroups = [...new Set(items.map(i => i.age_group).filter(Boolean))];
  const uniqueCountries = [...new Set(items.map(i => i.residence_country).filter(Boolean))];

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant={isSmDown ? "h5" : "h4"}
        gutterBottom
        sx={{ fontWeight: '700', color: theme.palette.text.primary, mb: 4 }}
      >
        Survey Analytics Dashboard
      </Typography>

      {/* Filters */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 5,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          background: 'linear-gradient(145deg, #f9f9f9, #e8e8e8)',
          borderRadius: 3,
        }}
      >
        <FilterList sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="subtitle1" sx={{ mr: 3, fontWeight: '600' }}>
          Filters
        </Typography>

        <FormControl sx={{ minWidth: 160 }} size="small" variant="outlined">
          <InputLabel id="age-filter-label">Age Group</InputLabel>
          <Select
            labelId="age-filter-label"
            value={ageGroupFilter}
            label="Age Group"
            onChange={e => setAgeGroupFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {uniqueAgeGroups.map(age => (
              <MenuItem key={age} value={age}>{age}</MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            Filter responses by age group
          </Typography>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }} size="small" variant="outlined">
          <InputLabel id="country-filter-label">Residence Country</InputLabel>
          <Select
            labelId="country-filter-label"
            value={countryFilter}
            label="Residence Country"
            onChange={e => setCountryFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {uniqueCountries.map(country => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            Filter responses by country of residence
          </Typography>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={sourcingFromHomeFilter === true}
              onChange={e => setSourcingFromHomeFilter(e.target.checked ? true : null)}
              color="primary"
            />
          }
          label="Sourcing from Home"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sourcingFromHomeFilter === false}
              onChange={e => setSourcingFromHomeFilter(e.target.checked ? false : null)}
              color="primary"
            />
          }
          label="Not Sourcing from Home"
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setAgeGroupFilter('');
            setCountryFilter('');
            setSourcingFromHomeFilter(null);
          }}
          sx={{
            ml: 'auto',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            },
          }}
          startIcon={<Cancel />}
        >
          Clear Filters
        </Button>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { label: 'Total Responses', value: safeFilteredItems.length, icon: <People fontSize="large" color="primary" /> },
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
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                background: 'linear-gradient(145deg, #fff, #f0f0f0)',
                boxShadow: theme.shadows[6],
                '&:hover': {
                  boxShadow: theme.shadows[12],
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Box sx={{ flexShrink: 0 }}>{icon}</Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                  {label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  {value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
        <Grid item xs={12} md={4} sx={{ height: isSmDown ? 320 : 360 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            Age Group Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={ageGroupData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
              <YAxis allowDecimals={false} stroke={theme.palette.text.secondary} />
              <RechartsTooltip
                cursor={{ fill: theme.palette.action.hover }}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                  boxShadow: theme.shadows[3],
                }}
              />
              <Bar dataKey="value" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={4} sx={{ height: isSmDown ? 320 : 360 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            Residence Country Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={countryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isSmDown ? 90 : 110}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {countryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: 12, color: theme.palette.text.secondary }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                  boxShadow: theme.shadows[3],
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={4} sx={{ height: isSmDown ? 320 : 360 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            Sourcing from Home
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={sourcingData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isSmDown ? 90 : 110}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sourcingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: 12, color: theme.palette.text.secondary }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                  boxShadow: theme.shadows[3],
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Data Table */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 6,
          boxShadow: theme.shadows[6],
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table size={isSmDown ? "small" : "medium"} aria-label="survey data table">
          <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Residence Country</TableCell>
              <TableCell>Origin Country</TableCell>
              <TableCell>Age Group</TableCell>
              <TableCell>Connected</TableCell>
              <TableCell>Sourcing from Home</TableCell>
              <TableCell>Shopping Method</TableCell>
              <TableCell>Shopping Challenges</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safeFilteredItems.map((item, index) => (
              <TableRow
                key={item.id || index}
                hover
                sx={{
                  cursor: 'default',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  <Tooltip title={item.email} arrow>
                    <Typography
                      noWrap
                      sx={{
                        maxWidth: 180,
                        color: theme.palette.primary.dark,
                        fontWeight: 500,
                        cursor: 'text',
                      }}
                    >
                      {item.email}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip label={item.residence_country} color="info" size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={item.origin_country} color="secondary" size="small" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.age_group || 'Unknown'}
                    color={ageGroupColors[item.age_group] || 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="How connected" arrow>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.how_connected || 'N/A'}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {item.sourcing_from_home ? (
                    <Chip
                      icon={<CheckCircle />}
                      label="Yes"
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      icon={<Cancel />}
                      label="No"
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {item.shoppingmethod || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                    {item.shoppingchallenges || '-'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SurveyAnalytics;
