import { useEffect, useState } from "react";

import api from "../../services/api";

import { useAuth } from "../../hooks/useAuth";

import DonationForm from "../../components/donation/DonationForm";

import DonationBenefits from "../../components/donation/DonationBenefits";

import "./UserDonate.css";

const UserDonate = () => {
  const { user } = useAuth();

  const [totalRaised, setTotalRaised] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");

      setTotalRaised(response.data.stats.totalAmountRaised);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="user-donate">
      <div className="donate-header">
        <h1>Support Community Projects</h1>

        <p>
          Donate today and earn voting credits to help decide which projects
          receive funding.
        </p>
      </div>

      <div className="donation-stats">
        <div className="stat-card">
          <h3>Total Raised</h3>

          <span>€{totalRaised.toLocaleString()}</span>
        </div>

        <div className="stat-card">
          <h3>Your Credits</h3>

          <span>{user?.votingCredits || 0}</span>
        </div>
      </div>

      <div className="donation-layout">
        <DonationForm />

        <DonationBenefits />
      </div>
    </section>
  );
};

export default UserDonate;
