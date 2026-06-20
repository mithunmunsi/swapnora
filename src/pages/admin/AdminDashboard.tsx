import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import api from "../../services/api";

import StatsCard from "../../components/admin/StatsCard";

interface AdminStats {
  totalUsers: number;
  totalProjects: number;
  totalDonations: number;
  totalVotes: number;
  totalFundsRaised: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats");

        setStats(response.data.stats);
      } catch (error) {
        console.error(error);

        setError("Failed to load admin statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="admin-loading">Loading statistics...</div>;
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>

          <p>Monitor projects, donations and users.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon="👥"
        />

        <StatsCard
          title="Projects"
          value={stats?.totalProjects || 0}
          icon="📋"
        />

        <StatsCard
          title="Donations"
          value={stats?.totalDonations || 0}
          icon="💳"
        />

        <StatsCard title="Votes" value={stats?.totalVotes || 0} icon="🗳️" />

        <StatsCard
          title="Funds Raised"
          value={`€${stats?.totalFundsRaised || 0}`}
          icon="💰"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
