import { Outlet } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
import "../../pages/user/UserDashboard.css";
import Footer from "../../components/Footer";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardLayout = ({ user, setUser }: { user: any; setUser: any }) => {
  useEffect(() => {
    const rightbar = document.querySelector(
      ".dashboard-rightbar"
    ) as HTMLElement;

    const handleScroll = () => {
      const rightbarHeight = rightbar.scrollHeight;
      const rightbarScrollTop = rightbar.scrollTop;
      const rightbarClientHeight = rightbar.clientHeight;

      // If right sidebar content is fully scrolled, stop scrolling
      if (rightbarScrollTop + rightbarClientHeight >= rightbarHeight) {
        rightbar.style.overflowY = "hidden"; // Stop scrolling when content ends
      } else {
        rightbar.style.overflowY = "scroll"; // Allow scrolling if content hasn't finished
      }
    };

    // Listen to scroll events on the right sidebar
    rightbar?.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      rightbar?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <Sidebar user={user} setUser={setUser} />
      </aside>

      {/* Main area + Footer */}
      <div className="dashboard-main-wrapper">
        <main className="dashboard-main">
          <Outlet />
        </main>
        {/* ✅ Footer shown only inside dashboard */}
        <footer className="dashboard-footer">
          <Footer />
        </footer>
      </div>

      {/* Right Sidebar */}
      <aside className="dashboard-rightbar">
        <div className="rightbar-content">
          <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
          <ul className="space-y-2">
            <li>
              <a href="#">Follow @openai</a>
            </li>
            <li>
              <a href="#">Follow @elonmusk</a>
            </li>
            <li>
              <a href="#">Trending: #React</a>
            </li>
            <li>
              <a href="#">#JavaScript</a>
            </li>
            <li>
              <a href="#">#TypeScript</a>
            </li>
            <li>
              <a href="#">#NextJS</a>
            </li>
            <li>
              <a href="#">#WebDev</a>
            </li>
            <li>
              <a href="#">#AI</a>
            </li>
            <li>
              <a href="#">#Cloud</a>
            </li>
            <li>
              <a href="#">#Security</a>
            </li>
          </ul>
        </div>
        <div className="rightbar-content">
          <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
          <ul className="space-y-2">
            <li>
              <a href="#">Follow @openai</a>
            </li>
            <li>
              <a href="#">Follow @elonmusk</a>
            </li>
            <li>
              <a href="#">Trending: #React</a>
            </li>
            <li>
              <a href="#">#JavaScript</a>
            </li>
            <li>
              <a href="#">#TypeScript</a>
            </li>
            <li>
              <a href="#">#NextJS</a>
            </li>
            <li>
              <a href="#">#WebDev</a>
            </li>
            <li>
              <a href="#">#AI</a>
            </li>
            <li>
              <a href="#">#Cloud</a>
            </li>
            <li>
              <a href="#">#Security</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default DashboardLayout;
