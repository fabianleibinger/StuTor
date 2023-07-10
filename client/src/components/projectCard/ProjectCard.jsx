import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //   "_id": "64a2a30fe9455e85c93f7324",
  // "course": "64744a0eee6d5f6b120ddac2",
  // "tutoredBy": "6468f36705853e6071dfec63",
  // "description": "this is a very nice course",
  // "pricePerHourEuro": 27,
  // "languages": [
  //     "Portuguese"
  // ],

  return (
    <div
      className={`projectCard ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* background img */}
      <div className="background">
        <img src={card.tutorProfilePic} alt="" />
      </div>

      <div className="course-description">
        {/* course description */}
        <p>Course Description: {card.description}</p>
      </div>

      <div className="info">
        {/* profile pic */}
        <img src={card.tutorProfilePic} alt="" />

        <div className="texts">
          {/* course name */}
          <h1 style={{ fontSize: "20px" }}>{card.courseName}</h1>

          {/* tutor name */}
          <h2>
            Tutor:&nbsp;&nbsp;
            <span style={{ fontStyle: "italic" }}>{card.tutorName}</span>
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
