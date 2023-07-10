import React, { useState } from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`projectCard ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="background">
        {/* background img */}
        <img src={card.img} alt="" />
      </div>

      <div className="course-description">
        {/* course description */}
        <p>{card.courseDescription}</p>
      </div>

      <div className="info">
        {/* profile pic */}
        <img src={card.pp} alt="" />

        <div className="texts">
          {/* course name */}
          <h2>{card.cat}</h2>

          {/* tutor name */}
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
