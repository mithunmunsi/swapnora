import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar"; // Import the sidebar
import { Outlet } from "react-router-dom"; // To render nested routes

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar /> {/* Sidebar on the left */}
      <div className="admin-content">
        <Outlet /> {/* This will render the content based on the route */}
      </div>
    </div>
  );
};

export default AdminLayout;
