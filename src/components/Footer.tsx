import { Link } from "react-router-dom";
import apple from "../assets/apple-pay.png";
import google from "../assets/google-pay.svg";
import paypal from "../assets/paypal.svg";
import mastercard from "../assets/mastercard-logo.svg";
import visacard from "../assets/visapay.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <SocialIcons />
        <nav className="footer-navigation">
          <ul className="footer-links">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms&conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/donor">Become a Donor</Link>
            </li>
            <li>
              <Link to="/nora">Become a Volunteer</Link>
            </li>
          </ul>
        </nav>
        <div className="payment-methods">
          <ul className="payment-icons">
            <li>
              <img src={apple} alt="Apple Pay" />
            </li>
            <li>
              <img src={google} alt="Google Pay" />
            </li>
            <li>
              <img src={paypal} alt="PayPal" />
            </li>
            <li>
              <img src={mastercard} alt="MasterCard" />
            </li>
            <li>
              <img src={visacard} alt="Visa Card" />
            </li>
          </ul>
        </div>
        <p className="footer-copyright">&copy; 2025 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

const SocialIcons = () => (
  <div className="social-icons">
    <a href="https://facebook.com" aria-label="Facebook">
      {/* Facebook Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="28"
        height="28"
        fill="#000000"
        viewBox="0 0 50 50"
      >
        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
      </svg>
    </a>
    <a href="https://facebook.com" aria-label="Facebook">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="28"
        height="28"
        fill="#000000"
        viewBox="0 0 50 50"
      >
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
      </svg>
    </a>

    <a href="https://facebook.com" aria-label="Facebook">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="28"
        height="28"
        fill="#000000"
        viewBox="0 0 50 50"
      >
        <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
      </svg>
    </a>
    <a href="https://facebook.com" aria-label="Facebook">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="28"
        height="28"
        fill="#000000"
        viewBox="0 0 50 50"
      >
        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
      </svg>
    </a>
    <a href="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="28"
        height="28"
        fill="#000000"
        viewBox="0 0 50 50"
      >
        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M30.65,18 c0.19,0,0.35,0.17,0.35,0.37v4.26c0,0.2-0.16,0.37-0.35,0.37H26c0,0,0,7.98,0,8.19c0,0.2,0.18,2.69,2.78,2.69 c2.15,0,3.67-1.14,3.69-1.15c0.05-0.04,0.12-0.06,0.18-0.06s0.12,0.02,0.17,0.05C32.93,32.78,33,32.9,33,33.03v3.7 c0,0.1-0.04,0.2-0.12,0.26C32.79,37.08,30.32,39,25.25,39C19.17,39,19,32.1,19,31.31V23h-2.65C16.16,23,16,22.85,16,22.65v-3.57 c0-0.15,0.09-0.28,0.22-0.33c0.06-0.02,5.5-2.19,5.5-7.41c0-0.2,0.15-0.36,0.34-0.36L25.65,11c0.19,0,0.35,0.16,0.35,0.35V18H30.65z"></path>
      </svg>
    </a>
  </div>
);
