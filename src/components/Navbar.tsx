import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Listen for window resizing and adjust the view mode
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <img
              src="/favicon.png"
              alt="Swapnora Logo"
              className="brand-logo"
            />
            <h1 className="brand-name">Swapnora</h1>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation Links */}
        <nav
          className={`navbar-menu ${
            isMobileMenuOpen ? "navbar-menu-mobile active" : ""
          }`}
        >
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link
                to="/"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined} // Only toggle on mobile
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/donate"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined} // Only toggle on mobile
              >
                Donate
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/vote"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined} // Only toggle on mobile
              >
                Vote
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/chat"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined} // Only toggle on mobile
              >
                Live Chat
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="navbar-cta">
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
          <Link to="/register" className="btn btn-register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
