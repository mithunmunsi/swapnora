import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}

      <main className="flex-grow">
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
};

export default PublicLayout;
