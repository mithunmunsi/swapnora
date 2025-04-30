import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaEnvelope,
  FaBell,
  FaNewspaper,
  FaCheese,
  FaPollH,
  FaPaperPlane,
} from "react-icons/fa";
import "./Sidebar.css";
const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
  { name: "News Feed", path: "/dashboard/news-feed", icon: <FaNewspaper /> },
  { name: "Donate", path: "/dashboard/donate", icon: <FaCheese /> },
  { name: "Projects", path: "/dashboard/projects", icon: <FaPollH /> },
  { name: "Join Chat", path: "/dashboard/chat", icon: <FaPaperPlane /> },
  { name: "Messages", path: "/dashboard/messages", icon: <FaEnvelope /> },
  { name: "Notifications", path: "/dashboard/notifications", icon: <FaBell /> },
  { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Sidebar = ({ user, setUser }: { user: any; setUser: any }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear token if you store auth
    navigate("/");
  };
  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img src="/favicon.png" alt="Swapnora Logo" className="brand-logo" />
          <h1 className="brand-name">Swapnora</h1>
        </Link>
      </div>
      <div className="profile-container">
        {user && (
          <div className="profile">
            <img src={user.profilePic} alt="Profile" className="profile-img" />
            <span>{user.name}</span>
          </div>
        )}
      </div>
      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <Link to={item.path} className="sidebar-link">
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="btn btn-logout">
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
