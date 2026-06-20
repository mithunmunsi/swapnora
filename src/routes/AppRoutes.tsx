import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../pages/user/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../pages/Home";
import Donate from "../pages/Donate";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PublicProfile from "../pages/PublicProfile";

// Projects
import Vote from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";

// Stories
import ProjectGallery from "../pages/ProjectGallery";
import ProjectGalleryDetails from "../pages/ProjectGalleryDetails";

// Team
import TeamShowcase from "../components/TeamShowcase";
import TeamDetails from "../components/TeamDetails";

// Donation
import MakeDonation from "../pages/user/MakeDonation";
import DonationFeed from "../components/donation/DonationFeed";

// User Dashboard
import DashboardHome from "../pages/user/DashboardHome";
import NewsFeed from "../pages/user/NewsFeed";
import Profile from "../pages/user/Profile";
import Settings from "../pages/user/Settings";
import Messages from "../pages/user/Messages";
import Notifications from "../pages/user/Notifications";
import Fundraiser from "../pages/user/Fundraising";
import ProjectFundraising from "../pages/user/ProjectFundraising";
import Projects from "../pages/user/Projects";
import DonationHistory from "../pages/user/DonationHistory";
import UserDonate from "../pages/user/UserDonate";
import Chat from "../pages/Chat";
import CompletedProjects from "../pages/user/CompletedProjects";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDonations from "../pages/admin/AdminDonations";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminFundraising from "../pages/admin/AdminFundraising";
import AdminNews from "../pages/admin/AdminNews";
import DonationSuccess from "../pages/user/DonationSuccess";
import DonationCancel from "../pages/user/DonationCancel";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/profile/:userId" element={<PublicProfile />} />

          {/* Team */}
          <Route path="/team" element={<TeamShowcase />} />
          <Route path="/team/:name" element={<TeamDetails />} />

          {/* Projects */}
          <Route path="/projects" element={<Vote />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />

          {/* Stories */}
          <Route path="/stories" element={<ProjectGallery />} />
          <Route path="/stories/:id" element={<ProjectGalleryDetails />} />

          {/* Donations */}
          <Route path="/donate" element={<Donate />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Payments */}
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/donation-success" element={<DonationSuccess />} />

          <Route path="/donation-cancel" element={<DonationCancel />} />
        </Route>

        {/* ========================= */}
        {/* PROTECTED USER ROUTES */}
        {/* ========================= */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            <Route path="news-feed" element={<NewsFeed />} />

            <Route path="fundraising" element={<Fundraiser />} />

            <Route
              path="fundraising/:projectId"
              element={<ProjectFundraising />}
            />

            <Route path="donate-now" element={<MakeDonation />} />

            <Route path="projects" element={<Projects />} />

            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route
              path="/dashboard/completed-projects"
              element={<CompletedProjects />}
            />

            <Route path="messages" element={<Messages />} />

            <Route path="chat" element={<Chat />} />

            <Route path="profile" element={<Profile />} />

            <Route path="settings" element={<Settings />} />

            <Route path="notifications" element={<Notifications />} />

            <Route path="donations" element={<DonationHistory />} />

            <Route path="donate" element={<UserDonate />} />
          </Route>

          <Route path="/donation-feed" element={<DonationFeed />} />
        </Route>

        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route
              path="dashboard"
              element={<Navigate to="/admin" replace />}
            />

            <Route path="donations" element={<AdminDonations />} />
            <Route path="/admin/fundraising" element={<AdminFundraising />} />

            <Route path="projects" element={<AdminProjects />} />

            <Route path="users" element={<AdminUsers />} />
            <Route path="/admin/news" element={<AdminNews />} />

            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
