import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-links">
        <li className="sidebar-item">
          <Link to="/admin/dashboard" className="sidebar-link">
            Dashboard
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/projects" className="sidebar-link">
            Projects Management
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/users" className="sidebar-link">
            User Management
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/settings" className="sidebar-link">
            Settings
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default AdminSidebar;
