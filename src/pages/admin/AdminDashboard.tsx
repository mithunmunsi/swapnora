import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">🛠️ Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Projects */}
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">📋 Manage Projects</h2>
          <p>Approve, edit, or archive charity projects.</p>
          <Link to="/admin/projects" className="text-blue-700 underline">
            Go to Projects
          </Link>
        </div>

        {/* Manage Users */}
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">👥 Manage Users</h2>
          <p>View registered users and donation stats.</p>
          <Link to="/admin/users" className="text-green-700 underline">
            Go to Users
          </Link>
        </div>

        {/* Transactions */}
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">💳 Transactions</h2>
          <p>Monitor recent donations and payouts.</p>
          <Link to="/admin/transactions" className="text-yellow-700 underline">
            View Transactions
          </Link>
        </div>

        {/* Settings (optional) */}
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
          <p>Configure platform preferences.</p>
          <Link to="/admin/settings" className="text-red-700 underline">
            Platform Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
