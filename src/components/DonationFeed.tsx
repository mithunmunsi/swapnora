import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // 🧡 Animation library
import recentDonation from "../assets/personal-donate-stat.png";
import PayPalButton from "./PayPalButton";

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
        <motion.div
          className="donation-grid"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Image Section */}
          <motion.div
            className="donation-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={recentDonation}
              alt="Recent donations illustration"
              className="image"
              loading="lazy"
            />
          </motion.div>

          {/* Donations List */}
          <motion.div
            className="donation-list"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              <PayPalButton />

              <motion.button
                className="donation-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See all donors
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationFeed;
