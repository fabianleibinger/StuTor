import React, { useRef } from 'react';
import StudySessionSearchbar from '../components/Searchbars/StudySessionSearchbar';
import PriceFilter from '../components/Filters/PriceFilter';
import DepartmentFilter from '../components/Filters/DepartmentFilter';
import LanguageFilter from '../components/Filters/LanguageFilter';
import LanguageSelection from '../components/Filters/LanguageSelection';

import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { useState } from 'react';
import { useQuery } from 'react-query';

import { getStudysessionFiltered } from '../api/StudySession';
import StudySessionCard from '../components/StudySessionCard/StudySessionDetailsCard';
import useDebounce from '../hooks/useDebounce';

const ScrollableContainer = styled('div')({
  maxHeight: '70vh',
  overflow: 'auto'
});

function StudySessionsSearchResult({ isLoading, data, error }) {
  const userRole = 'STUDENT';
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
      <ScrollableContainer>
        <Grid container spacing={2}>
          {data.map(studySession => (
            <Grid item xs={12} sm={6} md={4} key={studySession._id}>
              <StudySessionCard
                studySession={studySession}
                onDelete={() => {}}
                tutorFirstName={studySession.tutoredBy.firstname}
                tutorLastName={studySession.tutoredBy.lastname}
                role={userRole}
                onItemClick={() => {}}
                details={true}
                addStudySessionComponent={null}
              />
            </Grid>
          ))}
        </Grid>
      </ScrollableContainer>
    );
  }

  return null;
}

export default function StudySessionSearch() {
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const debouncedSearchTerm = useDebounce(search, 200);

  const handleSearchInputChange = e => {
    setSearch(e.target.value);
  };

  const handleMaxPriceChange = value => {
    setMaxPrice(value);
    setShowClearButton(Boolean(value));
  };

  const clearMaxPrice = () => {
    handleMaxPriceChange('');
    if (maxPriceSelectRef.current) {
      maxPriceSelectRef.current.clearSelection();
    }
  };

  const clearLanguages = () => {
    handleLanguageChange([]);
    if (languageSelectRef.current) {
      languageSelectRef.current.clearSelection();
    }
  };

  const clearDepartment = () => {
    handleDepartmentChange('');
    if (departmentSelectRef.current) {
      departmentSelectRef.current.clearSelection();
    }
  };

  const handleLanguageChange = value => {
    setSelectedLanguages(value);
  };

  const handleDepartmentChange = value => {
    setSelectedDepartment(value);
  };

  const queryKey = {
    searchTerm: debouncedSearchTerm,
    maxPrice: maxPrice,
    languages: selectedLanguages,
    department: selectedDepartment
  };

  const { data, error, isLoading } = useQuery(
    ['StudySessionSearch', queryKey],
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
      languageSelectRef.current.clearSelection();
    }
    if (departmentSelectRef.current) {
      departmentSelectRef.current.clearSelection();
    }
  };

  const ClearButton = styled(Button)(({ theme }) => ({
    width: 'fit-content',
    height: 'fit-content',
    float: 'right',
    minWidth: 'auto',
    padding: '1px',
    fontSize: '0.6rem',
    textTransform: 'none',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }));

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'right',
          pt: 0,
          pb: 0,
          pl: 1,
          pr: 1
        }}
      >
        <Box sx={{ maxHeight: '10', width: '100%' }}>
          <StudySessionSearchbar
            handleSearchInputChange={handleSearchInputChange}
          />
        </Box>
        <Box
          id="filterBox"
          sx={{
            display: 'flex',
            gap: '3px',
            maxHeight: '60px',
            mt: 1
          }}
        >
          <Box
            id="PriceFilterBox"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            <ClearButton variant="outlined" onClick={clearMaxPrice}>
              Clear
            </ClearButton>
            <PriceFilter
              handleMaxPriceChange={handleMaxPriceChange}
              ref={maxPriceSelectRef}
            />
          </Box>
          <Box>
            <ClearButton variant="outlined" onClick={clearLanguages}>
              Clear
            </ClearButton>
            <LanguageFilter
              handleLanguageChange={handleLanguageChange}
              ref={languageSelectRef}
            />
          </Box>
          <Box>
            <ClearButton variant="outlined" onClick={clearDepartment}>
              Clear
            </ClearButton>
            <DepartmentFilter
              handleDepartmentChange={handleDepartmentChange}
              ref={departmentSelectRef}
            />
          </Box>
        </Box>
        <Box
          p={2}
          sx={{
            width: '100%',
            mt: 4,
            maxHeight: '70vh',
            alignItems: 'stretch'
          }}
        >
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
