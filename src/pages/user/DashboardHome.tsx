import { Link } from "react-router-dom";
import "./DashboardHome.css";

const mockUser = {
  name: "John Doe",
  totalDonated: 125,
  votes: ["Build Clean Water Wells", "Educational Support"],
  recentDonations: [
    { project: "Tree Planting", amount: 50, date: "2025-04-10" },
    { project: "Flood Relief", amount: 75, date: "2025-03-21" },
  ],
};

const DashboardHome = () => {
  return (
    <section className="dashboard__home">
      <header className="dashboard__header">
        <h1 className="dashboard__title">👋 Welcome, {mockUser.name}!</h1>
        <p className="dashboard__subtitle">Here's your impact summary</p>
      </header>

      {/* Donation Summary */}
      <section className="dashboard__section dashboard__donation-summary">
        <h2>💰 Donation Summary</h2>
        <p>
          You’ve donated <strong>${mockUser.totalDonated}</strong> so far.
          Amazing work! 🙌
        </p>
        <ul className="dashboard__donations">
          {mockUser.recentDonations.map((donation, index) => (
            <li key={index} className="dashboard__donation-item">
              <span>{donation.project}</span>
              <span>${donation.amount}</span>
              <span>{donation.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Voting Summary */}
      <section className="dashboard__section dashboard__votes">
        <h2>🗳️ Your Votes</h2>
        <ul>
          {mockUser.votes.map((project, index) => (
            <li key={index} className="dashboard__vote-item">
              ✅ {project}
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Actions */}
      <section className="dashboard__section dashboard__actions">
        <h2>🚀 Quick Actions</h2>
        <div className="dashboard__buttons">
          <Link
            to="/donate-now"
            className="dashboard__btn dashboard__btn--primary"
          >
            💖 Donate Again
          </Link>
          <Link
            to="/dashboard/projects"
            className="dashboard__btn dashboard__btn--success"
          >
            🗳️ Vote Projects
          </Link>
          <Link
            to="/dashboard/chat"
            className="dashboard__btn dashboard__btn--secondary"
          >
            💬 Join Chat
          </Link>
          <Link
            to="/dashboard/donations"
            className="dashboard__btn dashboard__btn--secondary"
          >
            Donations
          </Link>
        </div>
      </section>
    </section>
  );
};

export default DashboardHome;
