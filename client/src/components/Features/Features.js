import React from "react";

const Features = () => {
  return (
    <div className="features">
      <div className="container">
        <div className="item">
          <h1 style={{ fontWeight: "bold" }}>
            Quality Tutors From Your School At Your Fingertips
          </h1>
          <div className="title">
            {/* <img src="./img/check.png" alt="" /> */}
            Find a Tutor for You, Anytime, Anywhere
          </div>
          <p>Find the perfect tutor session that fits your busy schedule.</p>
          <div className="title">
            {/* <img src="./img/check.png" alt="" /> */}
            Boosted Efficiency for Studying
          </div>
          <p>
            Tutors can help you with exercises, tutorials, projects, and hard
            concepts in lectures. So you don't have to waste time scratching
            your head.
          </p>
          <div className="title">
            {/* <img src="./img/check.png" alt="" /> */}
            Becoming a Tutor Has Never Been Easier
          </div>
          <p>
            Perfect part-time job for students who wants flexible working
            schedule, quick cash, and a job that's in the field of study.
          </p>
          <div className="title">
            {/* <img src="./img/check.png" alt="" /> */}
            24/7 Support
          </div>
          <p>
            Our trusted customer support will guarantee the fairness of every
            transaction of yours.
          </p>
        </div>
        <div className="item">
          <img
            src="https://res.cloudinary.com/daefab1lj/image/upload/v1688979194/fcr5l0way2zvuyrsjlen.jpg"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
