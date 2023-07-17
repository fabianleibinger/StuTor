import React, { useRef } from 'react';

import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

// context
import { useUserContext } from '../context/UserProvider';

// api
import { getStudysessionFiltered } from '../api/StudySession';
import useDebounce from '../hooks/useDebounce';

// frontend
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { FilterContainer } from '../styles';
import StudySessionSearchbar from '../components/Searchbars/StudySessionSearchbar';
import LanguageFilter from '../components/Filters/LanguageFilter';
import StandardFilter from '../components/Filters/StandardFilter';
import ClearFilterButton from '../components/Filters/ClearFilterButton';
import StudySessionCard from '../components/StudySessionCard/StudySessionDetailsCard';
import ErrorDialog from '../components/Dialogs/ErrorDialog';

const ScrollableContainer = styled('div')({
  // adjustable, scrollable container holding the search results
  maxHeight: '70vh',
  overflow: 'auto'
});

function StudySessionsSearchResult({ isLoading, data, error }) {
  /**
   * StudySessionsSearchResult provides the necessary component for the study sessions, which passed all filter
   *
   * args:
   *    isLoading: if the query is still loading
   *    data: an array of study sessions, if the query was successfull
   *    error: an error if the query failed
   *
   * return:
   *    A Scrollable Container holding all, filtered, study sessions
   */

  // colors define the possible background colors of the study session cards
  const colors = [
    '#0fab3c',
    '#98f5ff',
    '#ee6363',
    '#ffa500',
    '	#eeaeee',
    '#1e90ff'
  ];

  // always student since the search results do not include the tutors study sessions. Thus, the searcher should not be able to update or delete them
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
  /**
   * The StudySession Search function provides to complete Search Page. Using Components like the Search, Filters and the Search Results
   *
   * It returns the page as a component wrapped in a Box
   */

  // filter constants
  const { searchString } = useParams();
  const [search, setSearch] = useState(searchString ? searchString : '');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  // references for the filters to be able to clear their internal value as well
  const maxPriceSelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const ratingSelectRef = useRef(null);

  // the current user
  const { user, setUser } = useUserContext();

  // debounceSearchTerm is used to update the search only every 200ms and not every time the user types something in.
  const debouncedSearchTerm = useDebounce(search, 200);

  const handleSearchInputChange = e => {
    setSearch(e.target.value);
  };

  // handling of the maxPrice filter
  const handleMaxPriceChange = value => {
    setMaxPrice(value);
  };
  const clearMaxPrice = () => {
    handleMaxPriceChange('');
    if (maxPriceSelectRef.current) {
      maxPriceSelectRef.current.clearSelection();
    }
  };

  // handling of the language filter
  const handleLanguageChange = value => {
    setSelectedLanguages(value);
  };

  const clearLanguages = () => {
    handleLanguageChange([]);
    if (languageSelectRef.current) {
      languageSelectRef.current.clearSelection();
    }
  };

  // handling of the rating filter
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

  // the StudySessionSearch query is used to receive all study sessions dependend on the filters and the search
  const { data, error, isLoading } = useQuery(
    ['StudySessionSearch', queryKey],
    () =>
      // use debounceSearchTerm to dealy the filtering, use all filters as object to filter the sessions additionally
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
