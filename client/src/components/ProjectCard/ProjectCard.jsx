import React, { useEffect, useState } from "react";
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
      {/* background img */}
      <div className="background">
        <img src={card.tutoredBy.picture} alt="" />
      </div>

      <div className="course-description">
        {/* course description */}
        <p>Course Description: {card.description}</p>
      </div>

      <div className="info">
        {/* profile pic */}
        <img src={card.tutoredBy.picture} alt="" />

        <div className="texts">
          {/* course name */}
          <h1 style={{ fontSize: "20px" }}>{card.course.name}</h1>

          {/* tutor name */}
          <h2>
            Tutor:&nbsp;&nbsp;
            <span style={{ fontStyle: "italic" }}>{card.tutoredBy.username}</span>
          </h2>

          {/* Price */}
          <h2>
            Price:&nbsp;&nbsp;
            <span style={{ fontStyle: "italic" }}>{card.pricePerHourEuro}</span>
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
