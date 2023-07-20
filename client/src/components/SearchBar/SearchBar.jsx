import React, { useState } from "react";
import "./SearchBar.scss";

import StudySessionSearchbar from "../Searchbars/StudySessionSearchbar";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSerach] = useState("");

  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSerach(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/SearchSessions/${search}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>tutor</span> for your courses now
          </h1>
          <div className="search">
            <StudySessionSearchbar
              handleSearchInputChange={handleSearchInputChange}
            />
            <button style={{ height: "56px" }} onClick={handleSearchClick}>
              Search
            </button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            {/* TO-DO: Link the button to course offerings */}
            <button>Machine Learning</button>
            <button>Introduction to Deep Learning</button>
            <button>Robotics</button>
            <button>Natural Language Processing</button>
            <button>Algorithmic Game Theory</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
