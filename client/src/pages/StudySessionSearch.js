import React, { useRef } from 'react';
import StudySessionSearchbar from '../components/Searchbars/StudySessionSearchbar';
import Pricefilter from '../components/Filters/PriceFilter';
import DepartmentFilter from '../components/Filters/DepartmentFilter';
import LanguageSelection from '../components/Filters/LanguageSelection';

import { Box, Button, Grid, Typography } from '@mui/material';

import { useState } from 'react';
import { useQuery } from 'react-query';

import { getStudysessionFiltered } from '../api/StudySession';
import StudySessionCard from '../components/StudySessionCard/StudySessionDetailsCard';
import useDebounce from '../hooks/useDebounce';

function StudySessionsSearchResult({ isLoading, data, error }) {
  // error is not thrown just loading???
  if (error) {
    return <div>Error: {error.message}</div>;
    // error.status? => replace a nice string
  }

  if (isLoading) {
    return <div key="loading StudySessions">Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <Typography>No results found.</Typography>;
  }
  if (data) {
    return (
      <div>
        <Grid container spacing={2}>
          {data.map(studySession => (
            <Grid item xs={12} sm={6} md={4} key={studySession._id}>
              <StudySessionCard
                studySession={studySession}
                onDelete={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return null;
}

export default function StudySessionSearch() {
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const debouncedSearchTerm = useDebounce(search, 200);

  const handleSearchInputChange = e => {
    setSearch(e.target.value);
  };

  const handleMaxPriceChange = value => {
    setMaxPrice(value);
  };

  const handleSelectedLanguages = value => {
    setSelectedLanguages(value);
  };

  const handleDepartmentChange = value => {
    setSelectedDepartment(value);
  };

  const { data, error, isLoading } = useQuery(
    [
      'StudySessionSearch',
      debouncedSearchTerm,
      maxPrice,
      selectedLanguages,
      selectedDepartment
    ],
    () =>
      getStudysessionFiltered(debouncedSearchTerm, {
        maxPrice: maxPrice,
        languages: selectedLanguages,
        department: selectedDepartment
      })
  );

  const maxPriceSelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const departmentSelectRef = useRef(null);

  const clearFilters = () => {
    setMaxPrice('');
    setSelectedLanguages([]);
    setSelectedDepartment('');

    // Reset the Select components to their initial state
    // Clear the value of the Select components
    if (maxPriceSelectRef.current) {
      maxPriceSelectRef.current.clearSelection();
    }
    if (languageSelectRef.current) {
      languageSelectRef.current.value = [];
    }
    if (departmentSelectRef.current) {
      departmentSelectRef.current.value = '';
    }
  };

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '75%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ maxHeight: '10' }}>
          <StudySessionSearchbar
            handleSearchInputChange={handleSearchInputChange}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '3px', maxHeight: '30px', mt: 2 }}>
          <Pricefilter
            handleMaxPriceChange={handleMaxPriceChange}
            ref={maxPriceSelectRef}
          />
          <LanguageSelection
            onSelectedLanguage={handleSelectedLanguages}
            ref={languageSelectRef}
          />
          <DepartmentFilter
            handleDepartmentChange={handleDepartmentChange}
            ref={departmentSelectRef}
          />
          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>
        <Box p={2} sx={{ width: '100%', mt: 4, maxHeight: '70vh' }}>
          <StudySessionsSearchResult
            isLoading={isLoading}
            data={data}
            error={error}
          />
        </Box>
      </Box>
    </Box>
  );
}
