import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { decryptData } from './decryptUtils';
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Checkbox,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF69B4'];

function SurveyAnalytics() {
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [sourcingFromHomeFilter, setSourcingFromHomeFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/survey-items/', {
      headers: { Authorization: 'Token your_token_here' },
    })
      .then(res => {
        const decrypted = decryptData(res.data.data);
        setItems(decrypted);
        setFilteredItems(decrypted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filtering function
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

  if (loading) return <Spinner size="xl" />;

  if (!items || items.length === 0) return <Text>No survey items found</Text>;

  // Aggregate data for charts

  // Age Group distribution
  const ageGroupData = filteredItems.reduce((acc, item) => {
    const key = item.age_group || 'Unknown';
    const found = acc.find(e => e.name === key);
    if (found) found.value++;
    else acc.push({ name: key, value: 1 });
    return acc;
  }, []);

  // Residence country distribution
  const countryData = filteredItems.reduce((acc, item) => {
    const key = item.residence_country || 'Unknown';
    const found = acc.find(e => e.name === key);
    if (found) found.value++;
    else acc.push({ name: key, value: 1 });
    return acc;
  }, []);

  // Sourcing from home counts
  const sourcingData = [
    { name: 'From Home', value: filteredItems.filter(i => i.sourcing_from_home).length },
    { name: 'Not From Home', value: filteredItems.filter(i => !i.sourcing_from_home).length },
  ];

  // Example: count of survey items over time (if you have timestamp)
  // For now skipping since your model has no timestamp.

  // Unique age groups & countries for filters
  const uniqueAgeGroups = [...new Set(items.map(i => i.age_group).filter(Boolean))];
  const uniqueCountries = [...new Set(items.map(i => i.residence_country).filter(Boolean))];

  return (
    <Box p={6}>
      <Heading mb={6}>Survey Items Analytics Dashboard</Heading>

      {/* Filters */}
      <Flex mb={6} gap={4} flexWrap="wrap">
        <Select
          placeholder="Filter by Age Group"
          value={ageGroupFilter}
          onChange={e => setAgeGroupFilter(e.target.value)}
          maxW="200px"
        >
          {uniqueAgeGroups.map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Residence Country"
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          maxW="200px"
        >
          {uniqueCountries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </Select>

        <Checkbox
          isChecked={sourcingFromHomeFilter === true}
          onChange={e => setSourcingFromHomeFilter(e.target.checked ? true : null)}
        >
          Sourcing from Home
        </Checkbox>
        <Checkbox
          isChecked={sourcingFromHomeFilter === false}
          onChange={e => setSourcingFromHomeFilter(e.target.checked ? false : null)}
        >
          Not Sourcing from Home
        </Checkbox>

        <Button onClick={() => {
          setAgeGroupFilter('');
          setCountryFilter('');
          setSourcingFromHomeFilter(null);
        }}>
          Clear Filters
        </Button>
      </Flex>

      {/* Summary Cards */}
      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
        <Box bg="blue.100" p={4} borderRadius="md" textAlign="center">
          <Text fontWeight="bold">Total Responses</Text>
          <Text fontSize="2xl">{filteredItems.length}</Text>
        </Box>
        <Box bg="green.100" p={4} borderRadius="md" textAlign="center">
          <Text fontWeight="bold">Sourcing from Home</Text>
          <Text fontSize="2xl">{sourcingData[0].value}</Text>
        </Box>
        <Box bg="orange.100" p={4} borderRadius="md" textAlign="center">
          <Text fontWeight="bold">Not Sourcing from Home</Text>
          <Text fontSize="2xl">{sourcingData[1].value}</Text>
        </Box>
        <Box bg="purple.100" p={4} borderRadius="md" textAlign="center">
          <Text fontWeight="bold">Unique Countries</Text>
          <Text fontSize="2xl">{uniqueCountries.length}</Text>
        </Box>
      </SimpleGrid>

      {/* Charts */}
      <Flex flexWrap="wrap" gap={10} mb={10}>
        <Box flex="1" minW="300px" height="300px" bg="gray.50" p={4} borderRadius="md">
          <Heading size="md" mb={4}>Age Group Distribution</Heading>
          <BarChart width={300} height={250} data={ageGroupData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3182CE" />
          </BarChart>
        </Box>

        <Box flex="1" minW="300px" height="300px" bg="gray.50" p={4} borderRadius="md">
          <Heading size="md" mb={4}>Residence Country Distribution</Heading>
          <PieChart width={300} height={250}>
            <Pie
              data={countryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {countryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>

        <Box flex="1" minW="300px" height="300px" bg="gray.50" p={4} borderRadius="md">
          <Heading size="md" mb={4}>Sourcing from Home</Heading>
          <PieChart width={300} height={250}>
            <Pie
              data={sourcingData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {sourcingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
      </Flex>

      {/* Data Table */}
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Residence Country</Th>
              <Th>Origin Country</Th>
              <Th>Age Group</Th>
              <Th>Connected</Th>
              <Th>Sourcing from Home</Th>
              <Th>Shopping Method</Th>
              <Th>Shopping Challenges</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems.map(item => (
              <Tr key={item.id}>
                <Td>{item.email}</Td>
                <Td>{item.residence_country}</Td>
                <Td>{item.origin_country}</Td>
                <Td>{item.age_group}</Td>
                <Td>{item.how_connected}</Td>
                <Td>{item.sourcing_from_home ? 'Yes' : 'No'}</Td>
                <Td>{item.shoppingmethod}</Td>
                <Td>{item.shoppingchallenges}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default SurveyAnalytics;
