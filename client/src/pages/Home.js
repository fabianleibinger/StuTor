import React from "react";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Features from "../components/Features/Features";
import Slide from "../components/Slide/Slide";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { projects } from "../components/ProjectCard/data";

function Home() {
  return (
    <div className="home">
      <SearchBar />

      <TrustedBy />

      <Features />

      {/* ------------------------- Example Tutoring Sessions -------------------------*/}
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
