import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./DashboardHome.css";

interface DashboardData {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };

  votingCredits: number;

  totalDonated: number;

  totalVotesUsed: number;

  totalDonations: number;

  totalVoteTransactions: number;

  supportedProjects: number;

  recentDonations: {
    _id: string;
    amount: number;
    donationType: "general" | "project";
    createdAt: string;

    project?: {
      title: string;
      category: string;
      fundingStatus: string;
    };
  }[];

  recentVotes: {
    _id: string;
    creditsUsed: number;

    project: {
      title: string;
    };
  }[];
}

const DashboardHome = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/users/dashboard");

        setDashboard(response.data.dashboard);
      } catch (error) {
        console.error(error);

        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  if (!dashboard) {
    return null;
  }

  const impactScore = Math.min(
    dashboard.totalDonated + dashboard.totalVotesUsed,
    1000,
  );

  const communityRank =
    dashboard.totalDonated >= 1000
      ? "🏆 Champion"
      : dashboard.totalDonated >= 500
        ? "🥇 Advocate"
        : dashboard.totalDonated >= 100
          ? "🥈 Supporter"
          : "🥉 New Member";

  return (
    <section className="dashboard__home">
      {/* Header */}

      <header className="dashboard-hero">
        <div>
          <h1>
            Welcome back, {dashboard.profile.firstName}
            👋
          </h1>

          <p>
            Thank you for helping communities grow through donations and voting.
          </p>
        </div>

        <div className="dashboard-rank">{communityRank}</div>
      </header>

      {/* Stats */}

      <section className="dashboard__stats">
        <div className="dashboard-stat-card">
          <span className="stat-icon">💰</span>

          <h3>Total Donated</h3>

          <p>€{dashboard.totalDonated.toLocaleString()}</p>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-icon">🪙</span>

          <h3>Voting Credits</h3>

          <p>{dashboard.votingCredits}</p>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-icon">🗳</span>

          <h3>Votes Used</h3>

          <p>{dashboard.totalVotesUsed}</p>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-icon">❤️</span>

          <h3>Supported Projects</h3>

          <p>{dashboard.supportedProjects}</p>
        </div>
      </section>

      <section className="dashboard-impact">
        <div className="impact-card">
          <h3>🌍 Impact Score</h3>

          <div className="impact-progress">
            <div
              className="impact-fill"
              style={{
                width: `${impactScore}%`,
              }}
            />
          </div>

          <p>{impactScore.toFixed(0)}% Community Impact</p>
        </div>

        <div className="impact-card">
          <h3>🎯 Giving Goal</h3>

          <p className="goal-value">
            €{dashboard.totalDonated}
            {" / "}
            €1000
          </p>

          <div className="impact-progress">
            <div
              className="impact-fill"
              style={{
                width: `${Math.min(
                  (dashboard.totalDonated / 1000) * 100,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>
      </section>
      {/* Donations */}

      <section className="dashboard__section">
        <h2>💸 Recent Donations</h2>

        {dashboard.recentDonations.length === 0 ? (
          <p>No donations yet.</p>
        ) : (
          <div className="dashboard-donations-grid">
            {dashboard.recentDonations.map((donation) => (
              <div key={donation._id} className="donation-card">
                <div className="donation-icon">💖</div>

                <div className="donation-info">
                  <h4>
                    {donation.donationType === "project"
                      ? "🎯 Project Donation"
                      : "💙 General Donation"}
                  </h4>

                  <p>{donation.project?.title || "Community Support Fund"}</p>

                  <small>{donation.project?.category || "General"}</small>
                </div>

                <div className="donation-amount">€{donation.amount}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Votes */}

      <section className="dashboard__section">
        <h2>🗳 Recent Votes</h2>

        {dashboard.recentVotes.length === 0 ? (
          <p>No votes yet.</p>
        ) : (
          <ul>
            {dashboard.recentVotes.map((vote) => (
              <li key={vote._id} className="dashboard__vote-item">
                ✅ {vote.project?.title} ({vote.creditsUsed} credits)
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Actions */}

      <section className="dashboard__section dashboard__actions">
        <h2>🚀 Quick Actions</h2>

        <div className="dashboard__buttons">
          <Link
            to="/dashboard/donate"
            className="dashboard__btn dashboard__btn--primary"
          >
            💖 Make Donation
          </Link>

          <Link
            to="/dashboard/projects"
            className="dashboard__btn dashboard__btn--success"
          >
            🗳 Vote Projects
          </Link>

          <Link
            to="/dashboard/news-feed"
            className="dashboard__btn dashboard__btn--secondary"
          >
            📰 Community News
          </Link>

          <Link
            to="/dashboard/profile"
            className="dashboard__btn dashboard__btn--secondary"
          >
            👤 My Profile
          </Link>
        </div>
      </section>
    </section>
  );
};

export default DashboardHome;
