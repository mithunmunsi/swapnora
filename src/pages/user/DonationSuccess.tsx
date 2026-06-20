import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

import "./DonationSuccess.css";

interface DonationInfo {
  amount: number;
  projectId?: string;
}

const DonationSuccess = () => {
  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);

  const [verified, setVerified] = useState(false);

  const [donationInfo, setDonationInfo] = useState<DonationInfo | null>(null);

  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id",
  );

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await api.get(`/payments/verify-session/${sessionId}`);

        if (response.data.paid) {
          setVerified(true);

          setDonationInfo({
            amount: response.data.amount,
            projectId: response.data.metadata?.projectId,
          });

          await refreshUser();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setLoading(false);
    }
  }, [sessionId, refreshUser]);

  if (loading) {
    return (
      <div className="donation-success-loading">Verifying your donation...</div>
    );
  }

  if (!verified) {
    return (
      <section className="donation-error">
        <div className="donation-error-card">
          <h1>⚠ Payment Not Verified</h1>

          <p>We could not verify this payment.</p>

          <Link to="/dashboard/fundraising" className="success-btn">
            Return to Fundraising
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="donation-success-page">
      <div className="donation-success-card">
        <div className="success-icon">✓</div>

        <h1>Donation Successful</h1>

        <p className="success-subtitle">
          Thank you for supporting a community project.
        </p>

        <div className="success-summary">
          <div className="summary-item">
            <span>Amount Donated</span>

            <strong>€{donationInfo?.amount.toFixed(2)}</strong>
          </div>

          <div className="summary-item">
            <span>Voting Credits Earned</span>

            <strong>+{donationInfo?.amount}</strong>
          </div>

          <div className="summary-item">
            <span>Status</span>

            <strong className="success-status">Completed</strong>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/dashboard/donations" className="success-btn">
            View Donation History
          </Link>

          <Link to="/dashboard/fundraising" className="success-btn secondary">
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationSuccess;
