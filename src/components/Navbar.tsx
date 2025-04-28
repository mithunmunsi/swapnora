import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/" className="flex gap-2">
          <img src="/favicon.png" alt="" />
          <h1 className="text-4xl">Swapnora</h1>
        </Link>
      </div>
      <div className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/donate" className="nav-link">
              Donate
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/vote" className="nav-link">
              Vote
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-link">
              Live Chat
            </Link>
          </li>
        </ul>
      </div>

      <div className="cta-buttons">
        <li className="nav-item">
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="btn btn-register">
            Register
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
