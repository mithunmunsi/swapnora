import { Outlet } from "react-router-dom";
// or wherever the User interface is
import Sidebar from "../../components/user/Sidebar";
import "../../pages/user/UserDashboard.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardLayout = ({ user, setUser }: { user: any; setUser: any }) => {
  return (
    <div className="dashboard">
      {/* Sidebar (Fixed) */}
      <Sidebar user={user} setUser={setUser} />

      {/* Main Content */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
