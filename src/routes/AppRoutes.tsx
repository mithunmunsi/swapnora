import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Layouts
import UserLayout from "../layouts/UserLayout";
import DashboardLayout from "../pages/user/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Donate from "../pages/Donate";
import Vote from "../pages/Projects";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import NotFound from "../pages/NotFound";
import DonationFeed from "../components/DonationFeed";
import DashboardHome from "../pages/user/DashboardHome";
import NewsFeed from "../components/user/NewsFeed";
import Profile from "../pages/user/Profile";
import Settings from "../pages/user/Settings";
import Messages from "../pages/user/Messages";
import Notifications from "../pages/user/Notifications";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";
import Projects from "../pages/user/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Campaigns from "../pages/user/Campaigns";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import TeamDetails from "../components/TeamDetails";
import TeamShowcase from "../components/TeamShowcase";
import DonationHistory from "../pages/user/DonationHistory";
import MakeDonation from "../components/MakeDonation";
import ProjectGallery from "../pages/ProjectGallery";
import ProjectGalleryDetails from "../pages/ProjectGalleryDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppRoutes = ({ user, setUser }: { user: any; setUser: any }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes with UserLayout */}
        <Route element={<UserLayout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/team" element={<TeamShowcase />} />
          <Route path="/team/:name" element={<TeamDetails />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate-now" element={<MakeDonation />} />
          <Route path="/projects" element={<Vote />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/stories" element={<ProjectGallery />} />
          <Route path="/stories/:id" element={<ProjectGalleryDetails />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={<DashboardLayout user={user} setUser={setUser} />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="news-feed" element={<NewsFeed />} />
          <Route path="donate" element={<Donate />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="projects" element={<Projects />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages user={user} />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="donations" element={<DonationHistory />} />
        </Route>

        {/* Protected route example */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/donation-feed" element={<DonationFeed />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<div>Admin Layout Here</div>}>
          <Route path="dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
