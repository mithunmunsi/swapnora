import { useState } from "react";

import api from "../../services/api";

interface Props {
  projectId: string;
  onDonationSuccess?: () => void;
}

const ProjectDonationForm = ({ projectId }: Props) => {
  const [amount, setAmount] = useState(20);

  const [loading, setLoading] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/payments/create-checkout-session", {
        amount,
        projectId,
      });

      const checkoutUrl = response.data.url;

      if (!checkoutUrl) {
        throw new Error("Checkout URL not received");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);

      alert("Failed to start payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="project-donation-form" onSubmit={handleDonate}>
      <h2>Support This Project</h2>

      <div className="donation-amount-group">
        <label>Donation Amount (€)</label>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Redirecting to Stripe..." : `Donate €${amount}`}
      </button>
    </form>
  );
};

export default ProjectDonationForm;
