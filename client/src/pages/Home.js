import React from "react";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Features from "../components/Features/Features";
import Slide from "../components/slide/Slide";
import ProjectCard from "../components/projectCard/ProjectCard";
import studySessions from "../components/ProjectCard/studySessions";

function Home() {
  return (
    <div className="home">
      <SearchBar />

      <TrustedBy />

      <Features />

      {/* ------------------------- Example Tutoring Sessions -------------------------*/}
      <Slide slidesToShow={4} arrowsScroll={4}>
        {studySessions.map((card) => (
          <ProjectCard key={card._id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
