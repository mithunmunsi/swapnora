// src/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";

// Lazy load pages/components
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));

// Lazy load pages/components
const Home = lazy(() => import("../pages/Home"));
const Donate = lazy(() => import("../pages/Donate"));
const Vote = lazy(() => import("../pages/Vote"));
const Chat = lazy(() => import("../pages/Chat"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const DonationFeed = lazy(() => import("../components/DonationFeed"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoute"));

const AppRoutes = () => {
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

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/donation-feed" element={<DonationFeed />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        {/* User Layout with Protected Route */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/dashboard"
            element={
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            }
          />
        </Route>

        {/* Admin Layout */}
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
