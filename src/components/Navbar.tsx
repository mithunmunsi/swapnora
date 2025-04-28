import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
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

        {/* Navigation Links */}
        <nav className="navbar-menu">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/donate" className="navbar-link">
                Donate
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/vote" className="navbar-link">
                Vote
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/chat" className="navbar-link">
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
    </header>
  );
};

export default Navbar;
