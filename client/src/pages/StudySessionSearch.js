import React, { useRef } from 'react';
import StudySessionSearchbar from '../components/Searchbars/StudySessionSearchbar';
import LanguageFilter from '../components/Filters/LanguageFilter';
import StandardFilter from '../components/Filters/StandardFilter';
import ClearFilterButton from '../components/Filters/ClearFilterButton';
import { FilterContainer } from '../styles';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { getStudysessionFiltered } from '../api/StudySession';
import StudySessionCard from '../components/StudySessionCard/StudySessionDetailsCard';
import ErrorDialog from '../components/Dialogs/ErrorDialog';
import useDebounce from '../hooks/useDebounce';

const ScrollableContainer = styled('div')({
  maxHeight: '70vh',
  overflow: 'auto'
});

function StudySessionsSearchResult({ isLoading, data, error }) {
  const colors = [
    '#0fab3c',
    '#98f5ff',
    '#ee6363',
    '#ffa500',
    '	#eeaeee',
    '#1e90ff'
  ];

  // always student
  const userRole = 'STUDENT';
  if (error) {
    if (error.message.includes('404')) {
      return (
        <ErrorDialog
          errorMessage={
            'Seems like there are no offers available for your search. Maybe you should think about offering one.'
          }
          dialogOpen={true}
        />
      );
    }
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div key="loading StudySessions">Loading...</div>;
  }
  if (!data || data.length === 0) {
    return (
      <ErrorDialog
        errorMessage={
          'Seems like there are no offers available for your search. Maybe you should think about offering one.'
        }
        dialogOpen={true}
      />
    );
  }
  if (data) {
    return (
      <ScrollableContainer sx={{ pl: 1 }}>
        <Grid container spacing={2}>
          {data.map((studySession, index) => {
            const colorIndex = index % colors.length;
            const backgroundColor = colors[colorIndex];
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={studySession._id}>
                <StudySessionCard
                  tutoredBy={studySession.tutoredBy}
                  studySession={studySession}
                  onDelete={() => {}}
                  role={userRole}
                  onItemClick={() => {}}
                  details={true}
                  addStudySessionComponent={null}
                  backgroundColor={backgroundColor}
                />
              </Grid>
            );
          })}
        </Grid>
      </ScrollableContainer>
    );
  }

  return null;
}

export default function StudySessionSearch() {
  const { searchString } = useParams();
  console.log(searchString);
  const [search, setSearch] = useState(searchString ? searchString : '');
  const [maxPrice, setMaxPrice] = useState('');

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const { user, setUser } = useContext(UserContext);

  const debouncedSearchTerm = useDebounce(search, 200);

  const handleSearchInputChange = e => {
    setSearch(e.target.value);
  };

  // handle Max Price lilter
  const handleMaxPriceChange = value => {
    setMaxPrice(value);
  };

  const clearMaxPrice = () => {
    handleMaxPriceChange('');
    if (maxPriceSelectRef.current) {
      maxPriceSelectRef.current.clearSelection();
    }
  };

  // handle language filter
  const handleLanguageChange = value => {
    setSelectedLanguages(value);
  };

  const clearLanguages = () => {
    handleLanguageChange([]);
    if (languageSelectRef.current) {
      languageSelectRef.current.clearSelection();
    }
  };

  const handleRatingChange = value => {
    console.log(value);
    setSelectedRating(value);
  };

  const clearRating = () => {
    handleRatingChange('');
    if (ratingSelectRef.current) {
      ratingSelectRef.current.clearSelection();
    }
  };

  const queryKey = {
    searchTerm: debouncedSearchTerm,
    maxPrice: maxPrice,
    languages: selectedLanguages,
    rating: selectedRating
  };

  const { data, error, isLoading } = useQuery(
    ['StudySessionSearch', queryKey],
    () =>
      getStudysessionFiltered(debouncedSearchTerm, {
        maxPrice: maxPrice,
        languages: selectedLanguages,
        rating: selectedRating,
        user: user
      }),
    {
      retry: false
    }
  );

  const maxPriceSelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const ratingSelectRef = useRef(null);

  return (
    <Box
      id="pageWrapper"
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        id="studySearchPageBox"
        sx={{
          width: '90vw',
          height: '90vh',
          minheight: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'right',
          pb: 1,
          pt: 2,
          pl: 1,
          pr: 1
        }}
      >
        <Box id="searchBarBox" sx={{ maxHeight: '10', width: '100%' }}>
          <StudySessionSearchbar
            handleSearchInputChange={handleSearchInputChange}
            searchString={search}
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
          <FilterContainer>
            <ClearFilterButton handleClick={clearMaxPrice} />
            <StandardFilter
              handleValueChange={handleMaxPriceChange}
              label={'Max Price'}
              items={{
                '10€': 10,
                '20€': 20,
                '30€': 30
              }}
              ref={maxPriceSelectRef}
            />
          </FilterContainer>
          <FilterContainer>
            <ClearFilterButton handleClick={clearLanguages} />
            <LanguageFilter
              handleLanguageChange={handleLanguageChange}
              ref={languageSelectRef}
            />
          </FilterContainer>
          <FilterContainer>
            <ClearFilterButton handleClick={clearRating} />
            <StandardFilter
              handleValueChange={handleRatingChange}
              label={'Rating'}
              items={{ '2 Stars': 2, '3 Stars': 3, '4 Stars': 4 }}
              ref={ratingSelectRef}
            />
          </FilterContainer>
        </Box>
        <Box
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
