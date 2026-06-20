import socket from "../../socket";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaEnvelope,
  FaNewspaper,
  FaDonate,
  FaProjectDiagram,
  FaComments,
  FaTachometerAlt,
} from "react-icons/fa";

import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

import "./Sidebar.css";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "News Feed",
    path: "/dashboard/news-feed",
    icon: <FaNewspaper />,
  },
  {
    name: "Donate Now",
    path: "/dashboard/donate",
    icon: <FaDonate />,
  },
  {
    name: "Fundraising",
    path: "/dashboard/fundraising",
    icon: <FaProjectDiagram />,
  },
  {
    name: "Projects",
    path: "/dashboard/projects",
    icon: <FaProjectDiagram />,
  },
  {
    name: "Stories",
    path: "/dashboard/completed-projects",
    icon: <FaProjectDiagram />,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: <FaComments />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <FaUser />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <FaCog />,
  },
  {
    name: "Donation History",
    path: "/dashboard/donations",
    icon: <FaEnvelope />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await api.get("/messages/unread-count");

      setUnreadCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    socket.on("unread_count_updated", (count) => {
      console.log(
        "Sidebar received unread count:",

        count,
      );

      setUnreadCount(count);
    });

    return () => {
      socket.off("unread_count_updated");
    };
  }, []);

  useEffect(() => {
    const handleMessagesRead = () => {
      fetchUnreadCount();
    };

    window.addEventListener("messages-read", handleMessagesRead);

    return () => {
      window.removeEventListener("messages-read", handleMessagesRead);
    };
  }, [fetchUnreadCount]);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="sidebar-brand">
        <Link to="/" className="sidebar-brand-link">
          <img
            src="/favicon.png"
            alt="Swapnora Logo"
            className="sidebar-brand-logo"
          />

          <h1 className="sidebar-brand-name">Swapnora</h1>
        </Link>
      </div>

      {/* User */}

      {user && (
        <div className="profile-container">
          <div className="profile">
            <div className="profile-avatar">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="sidebar-avatar-image"
                />
              ) : (
                user.firstName?.charAt(0).toUpperCase()
              )}
            </div>

            <div className="profile-info">
              <h4>
                {user.firstName} {user.lastName}
              </h4>

              <span>Credits: {user.votingCredits}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}

      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-item ${
              item.path === "/dashboard"
                ? location.pathname === "/dashboard"
                  ? "active"
                  : ""
                : location.pathname.startsWith(item.path)
                  ? "active"
                  : ""
            }`}
          >
            <Link to={item.path} className="sidebar-link">
              <span className="sidebar-icon">{item.icon}</span>

              <span className="sidebar-text">{item.name}</span>

              {item.path === "/dashboard/messages" && unreadCount > 0 && (
                <span className="message-badge">{unreadCount}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}

      <button onClick={handleLogout} className="btn btn-logout">
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
