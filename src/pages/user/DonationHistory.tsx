import { useState } from "react";

interface Donation {
  id: string;
  amount: number;
  project: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

const DonationHistory = () => {
  const [donations] = useState<Donation[]>([
    {
      id: "TXN12345",
      amount: 50,
      project: "Clean Water for All",
      date: "2025-04-20",
      status: "Completed",
    },
    {
      id: "TXN12346",
      amount: 30,
      project: "Medical Camp Support",
      date: "2025-03-10",
      status: "Completed",
    },
    {
      id: "TXN12347",
      amount: 100,
      project: "Education for Girls",
      date: "2025-02-01",
      status: "Pending",
    },
  ]);

  return (
    <div className="donation-history">
      <h2>Donation History</h2>
      <div className="history-table">
        <div className="table-header">
          <span>ID</span>
          <span>Project</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {donations.map((donation) => (
          <div key={donation.id} className="table-row">
            <span>{donation.id}</span>
            <span>{donation.project}</span>
            <span>${donation.amount.toFixed(2)}</span>
            <span>{donation.date}</span>
            <span className={`status ${donation.status.toLowerCase()}`}>
              {donation.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
