import { Link } from "react-router-dom";

const mockUser = {
  name: "John Doe",
  totalDonated: 125,
  votes: ["Build Clean Water Wells", "Educational Support"],
};

const UserDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">👋 Welcome, {mockUser.name}!</h1>

      {/* Donation Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">💰 Donation Summary</h2>
        <p>
          You have donated{" "}
          <span className="font-bold">${mockUser.totalDonated}</span> so far.
          Thank you!
        </p>
      </div>

      {/* Voting Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🗳️ Your Votes</h2>
        <ul className="list-disc list-inside text-gray-700">
          {mockUser.votes.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🚀 Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/donate"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Donate Again
          </Link>
          <Link
            to="/vote"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Vote Projects
          </Link>
          <Link
            to="/chat"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Join Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
