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
    // Simulated fetch, replace with real API later
    setDonations([
      { id: "1", donor: "Alice", amount: 100, date: "2025-04-25 10:00" },
      { id: "2", donor: "Bob", amount: 25, date: "2025-04-25 09:30" },
      { id: "3", donor: "Charlie", amount: 50, date: "2025-04-24 16:45" },
    ]);
  }, []);

  return (
    <section>
      <div className="container">
        <div className="two-column-section">
          <div className="left-column">
            <img src={recentDonation} alt="" />
          </div>
          <div className="right-column">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-8">
              <h2 className="text-xl font-bold mb-4">💸 Recent Donations</h2>
              <ul className="space-y-4 max-h-96 overflow-y-auto">
                {donations.map((donation) => (
                  <li
                    key={donation.id}
                    className="border-b pb-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{donation.donor}</p>
                      <p className="text-sm text-gray-500">{donation.date}</p>
                    </div>
                    <div className="text-green-600 font-bold text-lg">
                      ${donation.amount}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn">See all donors</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationFeed;
