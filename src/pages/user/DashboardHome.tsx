import { Link } from "react-router-dom";

const mockUser = {
  name: "John Doe",
  totalDonated: 125,
  votes: ["Build Clean Water Wells", "Educational Support"],
};

const DashboardHome = () => {
  return (
    <section className="dashboard-welcome">
      <h1>👋 Welcome, {mockUser.name}!</h1>

      {/* Donation Summary */}
      <div className="dashboard-section">
        <h2>💰 Donation Summary</h2>
        <p>
          You have donated <strong>${mockUser.totalDonated}</strong> so far.
          Thank you!
        </p>
      </div>

      {/* Voting Summary */}
      <div className="dashboard-section">
        <h2>🗳️ Your Votes</h2>
        <ul>
          {mockUser.votes.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>🚀 Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/donate" className="btn btn-primary">
            Donate Again
          </Link>
          <Link to="/vote" className="btn btn-success">
            Vote Projects
          </Link>
          <Link to="/chat" className="btn btn-secondary">
            Join Chat
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
