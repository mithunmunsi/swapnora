import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
import "../../pages/user/UserDashboard.css";
import Footer from "../../components/Footer";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardLayout = ({ user, setUser }: { user: any; setUser: any }) => {
  const location = useLocation();
  const showRightbar = location.pathname === "/dashboard/news-feed";

  useEffect(() => {
    if (!showRightbar) return;

    const rightbar = document.querySelector(
      ".dashboard-rightbar"
    ) as HTMLElement;

    const handleScroll = () => {
      const rightbarHeight = rightbar.scrollHeight;
      const rightbarScrollTop = rightbar.scrollTop;
      const rightbarClientHeight = rightbar.clientHeight;

      if (rightbarScrollTop + rightbarClientHeight >= rightbarHeight) {
        rightbar.style.overflowY = "hidden";
      } else {
        rightbar.style.overflowY = "scroll";
      }
    };

    rightbar?.addEventListener("scroll", handleScroll);

    return () => {
      rightbar?.removeEventListener("scroll", handleScroll);
    };
  }, [showRightbar]);

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <Sidebar user={user} setUser={setUser} />
      </div>

      <div className="dashboard-main-wrapper">
        <main className="dashboard-main">
          <Outlet />
        </main>
        <footer className="dashboard-footer">
          <Footer />
        </footer>
      </div>

      {/* ✅ Conditionally render rightbar */}
      {showRightbar && (
        <aside className="dashboard-rightbar">
          <div className="rightbar-content">
            <h3>Suggestions</h3>
            <ul>
              <li>
                <a href="#">Follow @openai</a>
              </li>
              <li>
                <a href="#">#React</a>
              </li>
              <li>
                <a href="#">#JavaScript</a>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DashboardLayout;
