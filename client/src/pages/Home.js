import React from "react";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import TrustedBy from "../components/trustedBy/TrustedBy";
import Features from "../components/Features/Features";
import Explore from "../components/Explore/Explore";
import Slide from "../components/slide/Slide";
import CatCard from "../components/catCard/CatCard";
import ProjectCard from "../components/projectCard/ProjectCard";
import { cards, projects } from "../data";

function Home() {
  return (
    <div className="home">
      <SearchBar />

      <TrustedBy />

      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      <Features />

      <Explore />

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
