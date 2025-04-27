// src/components/StorySection.tsx
import { FaFacebookF, FaEnvelope, FaLinkedinIn, FaLink } from "react-icons/fa";

const StorySection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Main Video or Image */}
      <div className="w-full aspect-video overflow-hidden rounded-lg">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Fundraiser Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Social Sharing */}
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-gray-500 hover:text-pink-500 transition">
          <FaFacebookF size={20} />
        </a>
        <a href="#" className="text-gray-500 hover:text-pink-500 transition">
          <FaEnvelope size={20} />
        </a>
        <a href="#" className="text-gray-500 hover:text-pink-500 transition">
          <FaLinkedinIn size={20} />
        </a>
        <a href="#" className="text-gray-500 hover:text-pink-500 transition">
          <FaLink size={20} />
        </a>
      </div>

      {/* Story Text */}
      <div className="text-gray-700 space-y-4 text-center">
        <p>
          At Junior Minds, we believe that every child has the potential to be a
          bright thinker. Our mission is to inspire and empower young minds
          through engaging educational programs that foster creativity, critical
          thinking, and a love for learning.
        </p>
        <p>
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
