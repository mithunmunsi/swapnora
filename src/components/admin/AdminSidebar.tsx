import {
  FaHome,
  FaProjectDiagram,
  FaUsers,
  FaDonate,
  FaCog,
  FaNewspaper,
} from "react-icons/fa";
import "./AdminSidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminSidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <FaHome />,
    },
    {
      title: "Projects",
      path: "/admin/projects",
      icon: <FaProjectDiagram />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      title: "Donations",
      path: "/admin/donations",
      icon: <FaDonate />,
    },
    {
      title: "Analytics",
      path: "/admin/fundraising",
      icon: <FaDonate />,
    },
    {
      title: "Post News",
      path: "/admin/news",
      icon: <FaNewspaper />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Swapnora</h2>
        <span>Admin Panel</span>
      </div>
      <div className="admin-user-card">
        <div className="admin-avatar">{user?.firstName?.charAt(0)}</div>

        <div className="admin-user-info">
          <h4>
            {user?.firstName} {user?.lastName}
          </h4>

          <span>{user?.role === "admin" ? "Administrator" : "User"}</span>
        </div>
      </div>
      <nav className="admin-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`admin-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
