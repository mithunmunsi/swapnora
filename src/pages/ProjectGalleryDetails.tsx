import { useState } from "react";
import { useParams } from "react-router-dom";

interface GalleryImage {
  url: string;
  alt: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  images: GalleryImage[];
}

const dummyProject: ProjectData = {
  id: "1",
  title: "Clean Water for All - Village X",
  description:
    "We successfully completed the Clean Water initiative in Village X. The project involved setting up a sustainable water filtration system and ensuring the villagers are trained to maintain it. Over 500+ people now have access to clean drinking water.",
  date: "March 24, 2025",
  location: "Village X, Bangladesh",
  images: [
    { url: "/images/gallery1.jpg", alt: "Village Water Pump" },
    { url: "/images/gallery2.jpg", alt: "Clean Water Station" },
    { url: "/images/gallery3.jpg", alt: "Community using clean water" },
  ],
};

const ProjectGalleryDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = dummyProject.images[currentIndex];
  const { id } = useParams();
  console.log("Project ID from URL:", id); // test if working

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === dummyProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dummyProject.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="project-gallery-details">
      <div className="carousel">
        <button className="nav-button prev" onClick={handlePrev}>
          ‹
        </button>
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="carousel-image"
        />
        <button className="nav-button next" onClick={handleNext}>
          ›
        </button>
      </div>

      <div className="project-info">
        <h2 className="project-title">{dummyProject.title}</h2>
        <p className="project-meta">
          📍 {dummyProject.location} | 📅 {dummyProject.date}
        </p>
        <p className="project-description">{dummyProject.description}</p>

        <div className="project-actions">
          <button className="donate-button">Donate</button>
          <button className="share-button">Share</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectGalleryDetails;
