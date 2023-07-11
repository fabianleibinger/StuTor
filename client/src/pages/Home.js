import React from "react";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Features from "../components/Features/Features";
import Slide from "../components/Slide/Slide";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import studySessions from "../components/ProjectCard/studySessions";

function Home() {
  return (
    <div className="home">
      <SearchBar />

      <TrustedBy />

      <Features />

      {/* ------------------------- Example Tutoring Sessions -------------------------*/}
      <div className="section-container">
        <h1>Quality Tutors From Your School At Your Fingertips</h1>
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
