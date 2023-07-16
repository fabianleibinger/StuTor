import React, { useRef } from "react";
import StudySessionSearchbar from "../components/Searchbars/StudySessionSearchbar";
import LanguageFilter from "../components/Filters/LanguageFilter";
import StandardFilter from "../components/Filters/StandardFilter";
import ClearFilterButton from "../components/Filters/ClearFilterButton";
import { FilterContainer } from "../styles";

import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useState, useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../context/UserContext";

import { getStudysessionFiltered } from "../api/StudySession";
import StudySessionCard from "../components/StudySessionCard/StudySessionDetailsCard";
import useDebounce from "../hooks/useDebounce";

const ScrollableContainer = styled("div")({
  maxHeight: "70vh",
  overflow: "auto",
});

function StudySessionsSearchResult({ isLoading, data, error }) {
  const colors = [
    "#0fab3c",
    "#98f5ff",
    "#ee6363",
    "#ffa500",
    "	#eeaeee",
    "#1e90ff",
  ];

  // always student
  const userRole = "STUDENT";
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
      <ScrollableContainer sx={{ pl: 1 }}>
        <Grid container spacing={2}>
          {data.map((studySession, index) => {
            const colorIndex = index % colors.length;
            const backgroundColor = colors[colorIndex];
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={studySession._id}>
                <StudySessionCard
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
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const { user, setUser } = useContext(UserContext);

  const debouncedSearchTerm = useDebounce(search, 200);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  // handle Max Price lilter
  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setShowClearButton(Boolean(value));
  };

  const clearMaxPrice = () => {
    handleMaxPriceChange("");
    if (maxPriceSelectRef.current) {
      maxPriceSelectRef.current.clearSelection();
    }
  };

  // handle language filter
  const handleLanguageChange = (value) => {
    setSelectedLanguages(value);
  };

  const clearLanguages = () => {
    handleLanguageChange([]);
    if (languageSelectRef.current) {
      languageSelectRef.current.clearSelection();
    }
  };

  // handle department filter
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const clearDepartment = () => {
    handleDepartmentChange("");
    if (departmentSelectRef.current) {
      departmentSelectRef.current.clearSelection();
    }
  };

  const handleRatingChange = (value) => {
    console.log(value);
    setSelectedRating(value);
  };

  const clearRating = () => {
    handleRatingChange("");
    if (ratingSelectRef.current) {
      ratingSelectRef.current.clearSelection();
    }
  };

  const queryKey = {
    searchTerm: debouncedSearchTerm,
    maxPrice: maxPrice,
    languages: selectedLanguages,
    department: selectedDepartment,
    rating: selectedRating,
  };

  const { data, error, isLoading } = useQuery(
    ["StudySessionSearch", queryKey],
    () =>
      getStudysessionFiltered(debouncedSearchTerm, {
        maxPrice: maxPrice,
        languages: selectedLanguages,
        department: selectedDepartment,
        rating: selectedRating,
        user: user,
      }),
    {
      retry: false,
    }
  );

  const maxPriceSelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const departmentSelectRef = useRef(null);
  const ratingSelectRef = useRef(null);

  const clearFilters = () => {
    setMaxPrice("");
    setSelectedLanguages([]);
    setSelectedDepartment("");
    setSelectedRating(0);

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
    if (ratingSelectRef.current) {
      ratingSelectRef.current.clearSelection();
    }
  };

  const ClearButton = styled(Button)(({ theme }) => ({
    width: "fit-content",
    height: "fit-content",
    float: "right",
    minWidth: "auto",
    padding: "1px",
    fontSize: "0.6rem",
    textTransform: "none",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }));

  return (
    <Box
      id="pageWrapper"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        id="studySearchPageBox"
        sx={{
          width: "90vw",
          height: "90vh",
          minheight: 1,
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "right",
          pb: 1,
          pt: 2,
          pl: 1,
          pr: 1,
        }}
      >
        <Box id="searchBarBox" sx={{ maxHeight: "10", width: "100%" }}>
          <StudySessionSearchbar
            handleSearchInputChange={handleSearchInputChange}
          />
        </Box>
        <Box
          id="filterBox"
          sx={{
            display: "flex",
            gap: "3px",
            maxHeight: "60px",
            mt: 1,
          }}
        >
          <FilterContainer>
            <ClearFilterButton handleClick={clearMaxPrice} />
            <StandardFilter
              handleValueChange={handleMaxPriceChange}
              label={"Max Price"}
              items={{
                "10€": 10,
                "20€": 20,
                "30€": 30,
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
            <ClearFilterButton handleClick={clearDepartment} />
            <StandardFilter
              handleValueChange={handleDepartmentChange}
              label={"Department"}
              items={{
                Informatics: "Informatics",
                Physics: "Physics",
                Other: "Other",
              }}
              ref={departmentSelectRef}
            />
          </FilterContainer>
          <FilterContainer>
            <ClearFilterButton handleClick={clearRating} />
            <StandardFilter
              handleValueChange={handleRatingChange}
              label={"Rating"}
              items={{ "2 Stars": 2, "3 Stars": 3, "4 Stars": 4 }}
              ref={ratingSelectRef}
            />
          </FilterContainer>
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: 4,
            maxHeight: "70vh",
            alignItems: "stretch",
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
