import React, { useState } from "react";
import { useQuery } from "react-query";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Features from "../components/Features/Features";
import { useUserContext } from "../context/UserProvider";

import { getStudysessionFiltered } from "../api/StudySession";

import useDebounce from "../hooks/useDebounce";

import Slide from "../components/Slide/Slide";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function Home() {
  const [search, setSearch] = useState("");
  const [studySessions, setStudySessions] = useState([]);
  const { user } = useUserContext();

  const debouncedSearchTerm = useDebounce("", 200);
  const queryKey = {
    searchTerm: debouncedSearchTerm,
  };

  useQuery(
    ["HomeStudySessionSearch", queryKey],
    async () => {
      const data = await getStudysessionFiltered(debouncedSearchTerm, {
        maxPrice: "",
        languages: [],
        rating: 0,
        user: null,
      });

      console.log("data: ", data);
      console.log("user._id: ", user._id);
      // Filter the studySessions to exclude those with tutoredBy === user._id
      const filteredStudySessions = data.filter(
        (session) => session.tutoredBy._id !== user._id
      );

      return filteredStudySessions;
    },
    {
      retry: false,
      onSuccess: (data) => {
        setStudySessions(data);
      },
      onLoading: (isLoading) => {
        console.log("StudySessions are loading");
      },
      onError: (error) => {
        console.error("An error occurred while searching study sessions");
      },
    }
  );

  return (
    <div className="home">
      <SearchBar />

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
