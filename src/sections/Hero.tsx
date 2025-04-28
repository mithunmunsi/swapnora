import { Link } from "react-router-dom";
import heroBG from "../assets/hero-bg.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <div className="hero-content">
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
          </div>

          {/* Image Content */}
          <div className="hero-image">
            <img
              src={heroBG}
              alt="People receiving donations happily"
              className="hero-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
