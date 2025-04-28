// src/components/StorySection.tsx
import { FaFacebookF, FaEnvelope, FaLinkedinIn, FaLink } from "react-icons/fa";

const StorySection = () => {
  return (
    <div className="story-section-container">
      {/* Main Video or Image */}
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Fundraiser Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video"
        ></iframe>
      </div>

      {/* Social Sharing */}
      <div className="social-icons-container">
        <a href="#" className="social-icon">
          <FaFacebookF size={20} />
        </a>
        <a href="#" className="social-icon">
          <FaEnvelope size={20} />
        </a>
        <a href="#" className="social-icon">
          <FaLinkedinIn size={20} />
        </a>
        <a href="#" className="social-icon">
          <FaLink size={20} />
        </a>
      </div>

      {/* Story Text */}
      <div className="story-text-container">
        <p className="story-text">
          At Junior Minds, we believe that every child has the potential to be a
          bright thinker. Our mission is to inspire and empower young minds
          through engaging educational programs that foster creativity, critical
          thinking, and a love for learning.
        </p>
        <p className="story-text">
          With a focus on hands-on activities and collaborative projects, we
          provide children with the tools they need to explore, discover, and
          thrive. Join us in shaping the future by investing in the education of
          our youngest learners today!
        </p>
      </div>
    </div>
  );
};

export default StorySection;
