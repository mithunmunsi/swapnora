import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import heroBG from "../assets/hero-bg.png";
import Brands from "../components/Brands";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="hero-heading">
              <span className="hero-heading-main">
                Together, We Make Good Things Happen.
              </span>
            </h1>

            <p className="hero-description">
              Join a community committed to making a real difference. Our
              platform connects donors, volunteers, and projects that need
              support — creating an impact that transforms lives. Whether you’re
              giving, sharing, or participating, every action you take helps
              build a brighter, more hopeful future for communities around the
              world.
            </p>
            <p className="tagline">Small Actions, Big Changes.</p>
            <p className="hero-description">
              Your donation plants seeds of hope. Together, we fund projects,
              empower communities, and change lives. Be a part of a movement
              where every contribution brings light to someone’s path.
            </p>

            <Link
              to="https://www.paypal.com/donate/?hosted_button_id=RHUEZP5CSVBGS"
              className="hero-button"
              target="_blank"
            >
              Donate Now
            </Link>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={heroBG}
              alt="People receiving donations happily"
              className="hero-img"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
      <Brands />
    </section>
  );
};

export default Hero;
