import { useEffect, useState } from "react";
import api from "../../services/api";
import DonationDetailsModal from "../../components/donation/DonationDetailsModal";
interface Donation {
  _id: string;

  amount: number;

  creditsEarned: number;

  paymentStatus: string;

  donationType: "general" | "project";

  createdAt: string;

  project?: {
    title: string;
    category: string;
    fundingStatus: string;
  };
}

const DonationHistory = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await api.get("/donations/my-donations");

      setDonations(response.data.donations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const openDonation = async (donationId: string) => {
    try {
      const response = await api.get(`/donations/${donationId}`);

      setSelectedDonation(response.data.donation);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="donation-history">
        <h2>Donation History</h2>

        <p>Loading donations...</p>
      </div>
    );
  }

  return (
    <div className="donation-history">
      <h2>Donation History</h2>

      {donations.length === 0 ? (
        <div className="empty-history">
          <h3>No donations yet</h3>

          <p>
            Your donation history will appear here once you support a project.
          </p>
        </div>
      ) : (
        <div className="history-table">
          <div className="table-header">
            <span>Type</span>
            <span>Project</span>

            <span>Category</span>

            <span>Amount</span>

            <span>Credits</span>

            <span>Status</span>

            <span>Date</span>
          </div>

          {donations.map((donation) => (
            <div
              key={donation._id}
              className="table-row clickable"
              onClick={() => openDonation(donation._id)}
            >
              <span
                className={`donation-type ${
                  donation.project ? "project" : "general"
                }`}
              >
                {donation.donationType === "project"
                  ? "🎯 Project Donation"
                  : "💙 General Donation"}
              </span>

              <span>{donation.project?.title || "General Donation"}</span>

              <span>{donation.project?.category || "General"}</span>

              <span>€{donation.amount.toFixed(2)}</span>

              <span>{donation.creditsEarned}</span>

              <span
                className={`status ${donation.paymentStatus.toLowerCase()}`}
              >
                {donation.paymentStatus}
              </span>

              <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
      {selectedDonation && (
        <DonationDetailsModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
};

export default DonationHistory;
