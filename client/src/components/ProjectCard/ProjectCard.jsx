import React, { useEffect, useState } from "react";
import "./ProjectCard.scss";
import { useNavigate } from "react-router-dom";

function ProjectCard({ card }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Access the navigate function

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(`/StudysessionDetailsPage/${card._id}`);
  };

  return (
    <div
      className={`projectCard ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* background img */}
      <div className="background">
        <img src={card.tutoredBy.picture} alt="" />
      </div>

      <div className="course-description">
        <p>Price: {card.pricePerHourEuro} Euros per Hour</p>
      </div>

      <div className="info">
        {/* profile pic */}
        <img src={card.tutoredBy.picture} alt="" />

        <div className="texts">
          {/* course name */}
          <h1 style={{ fontSize: "20px" }}>{card.courseName}</h1>

          {/* tutor name */}
          <h2>
            Tutor:&nbsp;&nbsp;
            <span style={{ fontStyle: "italic" }}>
              {card.tutoredBy.username}
            </span>
          </h2>

          {/* Languages */}
          <h2>
            Languages:{" "}
            <span style={{ fontStyle: "italic" }}>
              {card.languages.join(", ")}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
