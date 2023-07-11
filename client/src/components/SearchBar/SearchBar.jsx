import React from "react";
import "./SearchBar.scss";
import { StyledSearchIcon } from "../../styles";
import StudySessionSearchbar from "../Searchbars/StudySessionSearchbar";
import { Button } from '@mui/material';


function SearchBar({handleSearchInputChange}) {
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

            {/* TO-DO: ADD FUNCTION TO SEARCH BUTTON */}
            {/*<Button sx={{ height: '100%' }}>Search</Button>*/}
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
