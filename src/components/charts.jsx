import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { Grid, Typography, useTheme, useMediaQuery } from '@mui/material';

// Custom tooltip component with interactive elements
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      {label && <Typography variant="subtitle2">{label}</Typography>}
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {`${payload[0].name || ''}: ${payload[0].value}`}
      </Typography>
      {/* Example clickable link inside tooltip */}
      <a href="#more-info" style={{ fontSize: '12px' }}>
        More info
      </a>
    </div>
  );
};

const SummaryCharts = ({
  ageGroupData,
  countryData,
  sourcingData,
  COLOR_PALETTE,
}) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={5} justifyContent="center" sx={{ mb: 6 }}>
      {/* Age Group Bar Chart */}
      <Grid item xs={12} md={4} sx={{ height: isSmDown ? 320 : 380 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 700, letterSpacing: '0.05em' }}>
          Age Group Distribution
        </Typography>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={ageGroupData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
            <YAxis allowDecimals={false} stroke={theme.palette.text.secondary} />
            <RechartsTooltip
              content={<CustomTooltip />}
              wrapperStyle={{ pointerEvents: 'auto' }}
              cursor={{ fill: theme.palette.action.hover }}
            />
            <Bar
              dataKey="value"
              fill={theme.palette.primary.main}
              radius={[8, 8, 0, 0]}
              onClick={(data, index) => alert(`Clicked: ${data.name} — ${data.value}`)}
            />
          </BarChart>
        </ResponsiveContainer>
      </Grid>

      {/* Residence Country Pie Chart */}
      <Grid item xs={12} md={4} sx={{ height: isSmDown ? 320 : 380 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 700, letterSpacing: '0.05em' }}>
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
              {countryData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLOR_PALETTE[idx % COLOR_PALETTE.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                fontSize: 13,
                color: theme.palette.text.secondary,
                fontWeight: 600,
              }}
            />
            <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: 'auto' }} />
          </PieChart>
        </ResponsiveContainer>
      </Grid>

      {/* Sourcing From Home Pie Chart */}
      <Grid item xs={12} md={4} sx={{ height: isSmDown ? 320 : 380 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 700, letterSpacing: '0.05em' }}>
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
              {sourcingData.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={idx === 0 ? theme.palette.success.main : theme.palette.error.main}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                fontSize: 13,
                color: theme.palette.text.secondary,
                fontWeight: 600,
              }}
            />
            <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: 'auto' }} />
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default SummaryCharts;
