import React from "react";
import TeamSection from "../components/TeamShowcase";

const AboutUs: React.FC = () => {
  return (
    <div className="aboutus">
      <div className="aboutus-container">
        <h1>About Us</h1>
        <p className="intro">
          We are a mission-driven platform dedicated to empowering communities
          through collective action, transparent funding, and real-time impact.
        </p>

        <div className="aboutus-mission">
          <h2>Our Mission</h2>
          <p>
            To make charitable giving more transparent, democratic, and
            impactful. We aim to empower communities by funding initiatives that
            matter to the people.
          </p>
        </div>
        <div className="aboutus-vision">
          <h2>Our Vision</h2>
          <p>
            A world where everyone can make a difference, where small
            contributions create big changes, and where trust and community
            drive charitable action.
          </p>
        </div>
        <div className="aboutus-values">
          <h2>Our Values</h2>
          <ul>
            <li>Transparency</li>
            <li>Community Empowerment</li>
            <li>Accountability</li>
            <li>Innovation</li>
          </ul>
        </div>

        <div className="team">
          <h2>Our Team</h2>
          <p>
            We're a small but passionate team of developers, designers, and
            community builders based in Finland and beyond. Our diverse
            experiences fuel our shared vision of impact and innovation.
          </p>
          <TeamSection />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
