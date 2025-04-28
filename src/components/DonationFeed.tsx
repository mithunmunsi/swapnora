import { useEffect, useState } from "react";
import recentDonation from "../assets/recent-donations.png";

type Donation = {
  id: string;
  donor: string;
  amount: number;
  date: string;
};

const DonationFeed = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      setDonations([
        { id: "1", donor: "Alice", amount: 100, date: "2025-04-25 10:00" },
        { id: "2", donor: "Bob", amount: 25, date: "2025-04-25 09:30" },
        { id: "3", donor: "Charlie", amount: 50, date: "2025-04-24 16:45" },
      ]);
    };

    fetchDonations();
  }, []);

  return (
    <section className="donation-feed">
      <div className="container">
        <div className="donation-grid">
          {/* Image Section */}
          <div className="donation-image">
            <img
              src={recentDonation}
              alt="Recent donations illustration"
              className="image"
              loading="lazy"
            />
          </div>

          {/* Donations List */}
          <div className="donation-list">
            <div className="donation-card">
              <h2 className="donation-title">💸 Recent Donations</h2>

              <ul className="donation-items">
                {donations.map((donation) => (
                  <li key={donation.id} className="donation-item">
                    <div className="donation-info">
                      <p className="donor-name">{donation.donor}</p>
                      <p className="donation-date">{donation.date}</p>
                    </div>
                    <div className="donation-amount">${donation.amount}</div>
                  </li>
                ))}
              </ul>

              <button className="donation-button">See all donors</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationFeed;
