import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterTop,
  FooterItem,
  FooterBottom,
  FooterLeft,
} from "../styles";

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterItem>
            <h2>Math</h2>
            <span>Efficient Algorithms and Data Structures</span>
            <span>Advanced Algorithms</span>
            <span>Autonomous Driving</span>
            <span>Complex Analysis</span>
            <span>Coorperate Finance</span>
          </FooterItem>

          <FooterItem>
            <h2>Computer Science</h2>
            <span>Machine Learning</span>
            <span>Introduction to Deep Learning</span>
            <span>Natural Language Processing</span>
            <span>Network Security</span>
            <span>Algorithmic Game Theory</span>
          </FooterItem>

          <FooterItem>
            <h2>Enginnering</h2>
            <span>Robotics</span>
            <span>Computational Fluid Dynamics</span>
            <span>Sustanable Mobile Power Trains</span>
            <span>Finite Element Analysis</span>
            <span>Electric Motors</span>
          </FooterItem>

          <FooterItem>
            <h2>Physics</h2>
            <span>Machine Learning</span>
            <span>Physics & Astronomy</span>
            <span>Electrical & Electronic Engineering</span>
            <span>Mechanical, Aeronautical and Manufacturing Engineering</span>
            <span>Chemistry</span>
          </FooterItem>

          <FooterItem>
            <h2>Chemistry</h2>
            <span>Machine Learning</span>
            <span>Physics & Astronomy</span>
            <span>Electrical & Electronic Engineering</span>
            <span>Mechanical, Aeronautical and Manufacturing Engineering</span>
            <span>Chemistry</span>
          </FooterItem>

          <FooterItem>
            <h2>About Us</h2>
            <span>The Team</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
          </FooterItem>
          <FooterItem>
            <h2>Customer Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>How to Become Tutor?</span>
            <span>How to find a Tutor?</span>
          </FooterItem>
          <FooterItem>
            <h2>Our Community</h2>
            <span>Forum</span>
            <span>Events</span>
            <span>Invite a Friend</span>
          </FooterItem>
        </FooterTop>
        <hr />
        <FooterBottom>
          <FooterLeft>
            <h2>STUTOR</h2>
            <span>© STUTOR International Ltd. 2023</span>
          </FooterLeft>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
