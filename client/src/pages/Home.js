import React, { useState } from "react";
import { useQuery } from "react-query";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Features from "../components/Features/Features";

//import studySessions from "../components/projectCard/studySessions";
import { getStudysessionFiltered } from "../api/StudySession";
import { LoadingIndicator } from "../components/General/LoadingIndicator";
import { ErrorIndicator } from "../components/General/ErrorIndicator";

import useDebounce from "../hooks/useDebounce";

import Slide from "../components/Slide/Slide";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function Home() {
  const [search, setSearch] = useState("");
  const [studySessions, setStudySessions] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = (e) => {
    console.log("SearchButton pressed");
  };

  const debouncedSearchTerm = useDebounce(search, 200);
  const queryKey = {
    searchTerm: debouncedSearchTerm,
  };

  useQuery(
    ["HomeStudySessionSearch", queryKey],
    () =>
      getStudysessionFiltered(debouncedSearchTerm, {
        maxPrice: "",
        languages: [],
        department: "",
        rating: 0,
        user: null,
      }),
    {
      retry: false,
      onSuccess: (data) => {
        setStudySessions(data);
      },
      onLoading: (isLoading) => {
        console.log("StudySessions are loading");
      },
      onError: (error) => {
        // Perform any actions you want on error here
        console.error("An error occured while searching study sessions");
      },
    }
  );

  return (
    <div className="home">
      <SearchBar
        handleSearchInputChange={handleSearchInputChange}
        handleSearchButtonClick={handleSearchButtonClick}
      />

      <TrustedBy />

      <Features />

      {/* ------------------------- Example Tutoring Sessions -------------------------*/}
      <div className="section-container">
        <h1>Popular Tutor Sessions Now: </h1>
        {studySessions && studySessions.length > 0 && (
          <Slide slidesToShow={4} arrowsScroll={4}>
            {studySessions.map((card) => (
              <ProjectCard key={card._id} card={card} />
            ))}
          </Slide>
        )}
      </div>
    </div>
  );
}

export default Home;
