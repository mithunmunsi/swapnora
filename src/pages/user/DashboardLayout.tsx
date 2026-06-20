import socket from "../../socket";
import { useAuth } from "../../hooks/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
import "./DashboardLayout.css";
import { useEffect } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  const showRightbar = location.pathname === "/dashboard/news-feed";
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-main-content">
          <Outlet />
        </div>
      </main>

      {showRightbar && (
        <aside className="dashboard-rightbar">
          <div className="rightbar-content">
            <h3>Suggestions</h3>

            <ul>
              <li>Follow @openai</li>
              <li>#React</li>
              <li>#JavaScript</li>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DashboardLayout;
