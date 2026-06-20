import { useState } from "react";

import api from "../../services/api";

const amounts = [10, 20, 50, 100];

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(20);

  const [customAmount, setCustomAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(customAmount) || selectedAmount;

    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/payments/create-checkout-session", {
        amount,

        // No projectId
        projectId: null,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);

      alert("Failed to start payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="donation-form" onSubmit={handleDonate}>
      <h2>Make a Donation</h2>

      <div className="amount-grid">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className={`amount-btn ${
              selectedAmount === amount ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedAmount(amount);

              setCustomAmount("");
            }}
          >
            €{amount}
          </button>
        ))}
      </div>

      <div className="custom-amount">
        <label>Custom Amount</label>

        <input
          type="number"
          min="1"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="credit-preview">
        You will receive{" "}
        <strong>{Number(customAmount) || selectedAmount}</strong> voting credits
      </div>

      <button type="submit" disabled={loading} className="donate-btn">
        {loading
          ? "Redirecting..."
          : `Donate €${Number(customAmount) || selectedAmount}`}
      </button>
    </form>
  );
};

export default DonationForm;
