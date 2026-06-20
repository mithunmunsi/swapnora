import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRef } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <img
              src="/manus-logo-transparent.png"
              alt="Manus Foundation Logo"
              className="brand-logo"
            />
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
                to="/projects"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Projects
              </Link>
            </li>

            <li className="navbar-item">
              <Link
                to="/stories"
                className="navbar-link"
                onClick={isMobileView ? toggleMobileMenu : undefined}
              >
                Stories
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Area */}
        <div className="navbar-cta">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-login">
                Login
              </Link>

              <Link to="/register" className="btn btn-register">
                Register
              </Link>
            </>
          ) : (
            <div className="user-menu-container" ref={menuRef}>
              <button
                className="user-menu-trigger"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="navbar-avatar-image"
                    />
                  ) : (
                    user?.firstName?.charAt(0).toUpperCase()
                  )}
                </div>

                <span className="user-name">{user?.firstName}</span>

                <span className="dropdown-arrow">▼</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <Link
                    to="/dashboard/profile"
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    👤 Profile
                  </Link>

                  <Link
                    to={user?.role === "admin" ? "/admin" : "/dashboard"}
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    📊 Dashboard
                  </Link>

                  <Link
                    to="/dashboard/settings"
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    ⚙️ Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-item"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
