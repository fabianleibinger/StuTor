import React from "react";
import "./Slide.scss";
import { Carousel } from "react-responsive-carousel";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <Carousel showArrows={arrowsScroll} showThumbs={false}>
          {children}
        </Carousel>
      </div>
    </div>
  );
};

export default Slide;
