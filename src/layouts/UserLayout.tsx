import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User } from "../types/User";

interface UserLayoutProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserLayout = ({ user, setUser }: UserLayoutProps) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar user={user} setUser={setUser} />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default UserLayout;
