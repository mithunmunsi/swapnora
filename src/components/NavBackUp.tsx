import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../types/User";

const mockUser: User = {
  name: "John Doe",
  profilePic: "/profile.png",
};

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Navbar = ({ user, setUser }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation */}
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
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/donate"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Donate
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/vote"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Vote
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/chat"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Live Chat
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Area */}
        <div className="navbar-cta">
          {!user && (
            <>
              <Link
                to="/login"
                className="btn btn-login"
                onClick={() => setUser(mockUser)}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
