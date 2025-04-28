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
              <span className="hero-heading-main">For Someone</span>
              <span className="hero-heading-sub">Your Smallest Gift...</span>
              <span className="hero-heading-sub">is Everything</span>
            </h1>

            <p className="hero-description">
              Enable an on-page thermometer also optimized for full-screen live
              display at your in-person and virtual events. Multiple payment
              options, including digital wallets like Apple Pay, Google Pay,
              PayPal, and Venmo.
            </p>

            <Link to="/donate" className="hero-button">
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
