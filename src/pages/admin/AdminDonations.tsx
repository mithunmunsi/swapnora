import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminDonations.css";

interface Donation {
  _id: string;

  amount: number;

  creditsEarned: number;

  paymentStatus: string;

  createdAt: string;

  user: {
    firstName: string;
    lastName: string;
  };
}

const AdminDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await api.get("/admin/donations");

      setDonations(response.data.donations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0,
  );

  if (loading) {
    return <div>Loading donations...</div>;
  }

  return (
    <div className="admin-donations">
      <h1>💳 Donations</h1>

      <div className="donation-summary">
        <div className="summary-card">
          <h3>Total Donations</h3>

          <p>{donations.length}</p>
        </div>

        <div className="summary-card">
          <h3>Total Revenue</h3>

          <p>€{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <table className="donations-table">
        <thead>
          <tr>
            <th>Donor</th>

            <th>Amount</th>

            <th>Credits</th>

            <th>Status</th>

            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>
                {donation.user
                  ? `${donation.user.firstName} ${donation.user.lastName}`
                  : "Deleted User"}
              </td>

              <td>€{donation.amount}</td>

              <td>{donation.creditsEarned}</td>

              <td>{donation.paymentStatus}</td>

              <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonations;
