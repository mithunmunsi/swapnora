import { motion } from "framer-motion";
import aboutImage from "../assets/about-us.png";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        {/* Section Introduction */}
        <motion.div
          className="about-header text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="about-tag">Who Are We?</p>
          <h2 className="about-title">
            Tiny Drops Make Mighty Oceans of Hope.
          </h2>
        </motion.div>

        {/* Two Column Content */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Left Column */}
          <div className="about-text">
            <div className="about-story">
              <p className="about-subtag">Our Story</p>
              <h3 className="about-subtitle">
                Nonprofits get to the heart of many matters
              </h3>
            </div>

            <div className="about-card about-card-highlight">
              <p className="about-paragraph">
                We are a non-profit organization focused on helping communities
                through impactful projects funded by people like you. We believe
                nonprofits shouldn’t sacrifice their means to satisfy their
                missions. That’s why Give Lively was created. We are a
                philanthropist-funded, social impact–driven tech company that
                collaborates directly with nonprofits to build better
                fundraising tech and give it away to them for free.
              </p>
              <img
                src="https://cdn.prod.website-files.com/60995de2aeb0c3a6f1ec3f77/60995de2aeb0c3bc98ec41de_story-buble.png"
                alt="Story Bubble Decoration"
                className="about-card-image"
                loading="lazy"
                width="108"
              />
            </div>

            <div className="about-card">
              <p className="about-paragraph">
                Our goal is to help nonprofits of all sizes take advantage of
                the digital fundraising movement by dramatically improving the
                giving experience for everyone – nonprofits and donors alike.
                Did we mention we give our technology to nonprofits for free?
                Seriously.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="about-image">
            <img
              src={aboutImage}
              alt="About Us Section"
              className="about-main-image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
