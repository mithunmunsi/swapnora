import socket from "../../socket";
import { useAuth } from "../../hooks/useAuth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
import "./DashboardLayout.css";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const location = useLocation();
  const showRightbar = location.pathname === "/dashboard/news-feed";
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  useEffect(() => {
    const handleNewMessage = (message: {
      _id: string;
      sender: {
        _id: string;
        firstName: string;
      };
      content: string;
      conversation: string;
    }) => {
      if (message.sender._id === user?._id) {
        return;
      }

      if (!window.location.pathname.startsWith("/dashboard/messages")) {
        toast.info(`💬 ${message.sender.firstName}: ${message.content}`, {
          toastId: `message-${message._id}`,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          onClick: () =>
            navigate(
              `/dashboard/messages?conversation=${message.conversation}`,
            ),
        });
      }
    };

    socket.off("new_message", handleNewMessage);
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [user?._id, navigate]);

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
