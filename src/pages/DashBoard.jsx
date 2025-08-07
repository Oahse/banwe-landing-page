import { useEffect, useState } from 'react';
import axios from 'axios';

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
import { backendUrl } from '../constants.jsx';
import DetailedSurveyTable from '../components/tables.jsx';
import SummaryCards from '../components/summary.jsx';
import SummaryCharts from '../components/charts.jsx';
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

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    axios.delete(`${backendUrl}survey-items/${id}/`)
      .then(() => {
        setItems(prev => prev.filter(item => item.id !== id));
        setFilteredItems(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => {
        console.error("Error deleting item:", err.response ? err.response.data : err.message);
      });
  };

  useEffect(() => {
    axios.get(`${backendUrl}survey-items/`)
      .then(res => {
        const decrypted = res.data.data; // decryptData(res.data.data);
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
    if (ageGroupFilter) filtered = filtered.filter(item => item.age_group === ageGroupFilter);
    if (countryFilter) filtered = filtered.filter(item => item.residence_country === countryFilter);
    if (sourcingFromHomeFilter !== null) filtered = filtered.filter(item => item.sourcing_from_home === sourcingFromHomeFilter);

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
        <Typography variant="h6" color="text.secondary">No survey data available</Typography>
      </Box>
    );
  }

  const safeFilteredItems = filteredItems || [];

  // Color helpers
  const ageGroupColors = {
    '18-24': 'primary',
    '25-34': 'success',
    '35-44': 'warning',
    '45-54': 'info',
    '55+': 'error',
    Unknown: 'default',
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
        sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 5, letterSpacing: '0.05em' }}
      >
        Survey Analytics Dashboard
      </Typography>

      {/* Filters */}
      <Paper
        elevation={8}
        sx={{
          p: 3,
          mb: 6,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          alignItems: 'center',
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(145deg, #fefefe, #e7e7e7)' 
            : theme.palette.background.default,
          borderRadius: 4,
          boxShadow: theme.shadows[6],
          userSelect: 'none',
        }}
      >
        <FilterList sx={{ mr: 1.5, color: theme.palette.primary.main, fontSize: 28 }} />
        <Typography variant="subtitle1" sx={{ mr: 4, fontWeight: 700 }}>
          Filters
        </Typography>

        <FormControl sx={{ minWidth: 160 }} size="small" variant="outlined">
          <InputLabel id="age-filter-label">Age Group</InputLabel>
          <Select
            labelId="age-filter-label"
            value={ageGroupFilter}
            label="Age Group"
            onChange={e => setAgeGroupFilter(e.target.value)}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
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
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
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
          sx={{ userSelect: 'none' }}
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
          sx={{ userSelect: 'none' }}
        />

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setAgeGroupFilter('');
            setCountryFilter('');
            setSourcingFromHomeFilter(null);
          }}
          sx={{
            ml: 'auto',
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[8],
              backgroundColor: theme.palette.error.dark,
            },
          }}
          startIcon={<Cancel />}
        >
          Clear Filters
        </Button>
      </Paper>

      {/* Summary Cards */}
      <SummaryCards safeFilteredItems={safeFilteredItems} sourcingData={sourcingData} uniqueCountries={uniqueCountries}/>
      
      {/* Charts */}
      <SummaryCharts ageGroupData={ageGroupData} countryData={countryData} sourcingData={sourcingData} COLOR_PALETTE={COLOR_PALETTE}/>
      

      <DetailedSurveyTable data={safeFilteredItems} onDelete={handleDelete}/>
    </Container>
  );
}

export default SurveyAnalytics;
