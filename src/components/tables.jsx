import React, { useState } from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableSortLabel,
  TablePagination,
  Tooltip,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { CheckCircle, Cancel, Delete, Comment, ShoppingCart, Link as LinkIcon } from '@mui/icons-material';

// Format boolean sourcing from home with icon
const BooleanIcon = ({ value }) =>
  value ? (
    <Tooltip title="Sourcing from Home" arrow>
      <CheckCircle color="success" />
    </Tooltip>
  ) : (
    <Tooltip title="Not Sourcing from Home" arrow>
      <Cancel color="error" />
    </Tooltip>
  );

// Format date (dummy here since you didn't mention date fields)
const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const d = new Date(isoString);
  return d.toLocaleString();
};

// Helper for sorting (same as before)
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ageGroupColors = {
  '18-24': 'primary',
  '25-34': 'success',
  '35-44': 'warning',
  '45-54': 'info',
  '55+': 'error',
  Unknown: 'default',
};

export default function DetailedSurveyTable({ data, onDelete }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('residence_country');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, boxShadow: 5 }}>
      <TableContainer sx={{ maxHeight: 620 }}>
        <Table stickyHeader aria-label="detailed survey table" size="small">
          <TableHead>
            <TableRow>
              {[
                { id: 'email', label: 'Email', minWidth: 50 },
                { id: 'residence_country', label: 'Residence Country', minWidth: 140 },
                { id: 'origin_country', label: 'Origin Country', minWidth: 140 },
                { id: 'age_group', label: 'Age Group', minWidth: 100 },
                { id: 'how_connected', label: 'How Connected', minWidth: 140 },
                { id: 'sourcing_from_home', label: 'Sourcing From Home', minWidth: 130, align: 'center' },
                { id: 'sourcing_from_home_freq', label: 'Sourcing Frequency', minWidth: 140 },
                { id: 'shoppingmethod', label: 'Shopping Method', minWidth: 240 },
                { id: 'shoppinplatform_preference', label: 'Platform Preference', minWidth: 160 },
                { id: 'shoppingchallenges', label: 'Shopping Challenges', minWidth: 200 },
                { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
              ].map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align || 'left'}
                  style={{ minWidth: headCell.minWidth, fontWeight: 700, backgroundColor: '#1565c0', color: 'white' }}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.id !== 'actions' ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, headCell.id)}
                      sx={{ color: 'white', fontWeight: 700 }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.email} tabIndex={-1} sx={{ cursor: 'default' }}>
                  <TableCell>{row.email}</TableCell>

                  <TableCell>{row.residence_country || 'N/A'}</TableCell>
                  <TableCell>{row.origin_country || 'N/A'}</TableCell>

                  {/* Age group chip */}
                  <TableCell>
                    <Chip
                      label={row.age_group || 'Unknown'}
                      color={ageGroupColors[row.age_group] || 'default'}
                      size="small"
                      sx={{ fontWeight: 700, px: 1.5, py: 0.5 }}
                    />
                  </TableCell>

                  <TableCell>{row.how_connected || 'N/A'}</TableCell>

                  {/* sourcing_from_home icon */}
                  <TableCell align="center">
                    <BooleanIcon value={row.sourcing_from_home} />
                  </TableCell>

                  <TableCell>{row.sourcing_from_home_freq || 'N/A'}</TableCell>

                  <TableCell>{row.shoppingmethod || 'N/A'}</TableCell>

                  <TableCell>{row.shoppinplatform_preference || 'N/A'}</TableCell>

                  

                  {/* shoppingchallenges (JSON) */}
                  <TableCell>
                    {row.shoppingchallenges && Array.isArray(row.shoppingchallenges) && row.shoppingchallenges.length > 0 ? (
                      row.shoppingchallenges.map((challenge, i) => (
                        <Chip
                          key={i}
                          label={challenge}
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{ m: 0.3 }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.disabled" fontStyle="italic">
                        None
                      </Typography>
                    )}
                  </TableCell>

                  

                  {/* Actions */}
                  <TableCell align="center">
                    <Tooltip title="Delete this entry" arrow>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(row.id)}
                        aria-label={`delete survey item ${row.id}`}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={13} align="center" sx={{ py: 5 }}>
                  No survey data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 8, 12, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
