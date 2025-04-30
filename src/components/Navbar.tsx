import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/User";

const mockUser: User = {
  name: "John Doe",
  profilePic: "/user.jpg",
  id: "",
  email: "",
};

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Navbar = ({ user, setUser }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

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

  const handleFakeLogin = () => {
    setUser(mockUser); // Set user (login)
    navigate("/dashboard"); // Navigate to dashboard
  };

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
            <li className="navbar-item">
              <Link
                to="/blogs"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Blogs
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/events"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Events
              </Link>
            </li>
            <li className="navbar-link" onClick={handleFakeLogin}>
              Login
            </li>
          </ul>
        </nav>

        {/* CTA Area */}
        <div className="navbar-cta">
          {!user ? (
            <div className="btn btn-login" onClick={handleFakeLogin}>
              Login
            </div>
          ) : (
            <Link to="/dashboard">
              <img
                src={user.profilePic} // Profile picture from user
                alt="Profile"
                className="profile-pic"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
