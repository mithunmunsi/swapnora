import { Link } from "react-router-dom";
import heroBG from "../assets/hero-bg.png";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="two-column-section">
          <div className="left-column">
            <h1 className="heading-primary">
              <span className="heading-primary--main">For Someone</span>
              <span className="heading-primary--sub">
                {" "}
                Your Smallest Gift...
              </span>
              <span className="heading-primary--sub">is Everything</span>
            </h1>
            <p className="description">
              Enable an on-page thermometer also optimized for full-screen live
              display at your in-person and virtual events.Multiple payment
              options, including digital wallets like Apple Pay, Google Pay,
              PayPal and Venmo
            </p>

            <Link to="/donate" className="action-button">
              Donate Now
            </Link>
          </div>

          <div className="right-column">
            <img src={heroBG} alt="Description of image" className="hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
