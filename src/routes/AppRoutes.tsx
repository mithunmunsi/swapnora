// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import DashboardLayout from "../pages/user/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Donate from "../pages/Donate";
import Vote from "../pages/Vote";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppRoutes = ({ user, setUser }: { user: any; setUser: any }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />

        {/* Dashboard - User Layout */}
        <Route
          path="/dashboard"
          element={<DashboardLayout user={user} setUser={setUser} />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="news-feed" element={<NewsFeed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="donate" element={<Donate />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Protected route example */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/donation-feed" element={<DonationFeed />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
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
