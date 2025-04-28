import { useState } from "react";

const DonationForm = () => {
  const [selectedTab, setSelectedTab] = useState<string>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [dedicate, setDedicate] = useState<boolean>(false);
  const predefinedAmounts = [10, 20, 50, 100]; // Example predefined amounts

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Tabs */}
      <div className="tabs">
        <button
          type="button"
          onClick={() => setSelectedTab("one-time")}
          className={`tab-button ${
            selectedTab === "one-time" ? "selected" : ""
          }`}
        >
          One Time
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("monthly")}
          className={`tab-button ${
            selectedTab === "monthly" ? "selected" : ""
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Predefined Amounts */}
      <div className="amount-grid">
        {predefinedAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handleAmountSelect(amount)}
            className={`amount-button ${
              selectedAmount === amount ? "selected" : ""
            }`}
          >
            <span className="amount-amount">${amount}</span>
            <span className="amount-description">
              Monthly donation for education support
            </span>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="custom-amount">
        <label>Custom Amount {selectedTab === "monthly" && "Monthly"}</label>
        <div className="custom-amount-input">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            min="1"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter custom amount"
          />
        </div>
      </div>

      {/* Options */}
      <div className="checkbox-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label>
            Show my name as anonymous when displaying my donation publicly
          </label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={dedicate}
            onChange={() => setDedicate(!dedicate)}
          />
          <label>Dedicate this donation</label>
        </div>
      </div>

      {/* CTA Button */}
      <button type="submit" className="submit-button">
        {customAmount || selectedAmount
          ? `Donate $${customAmount || selectedAmount} ${
              selectedTab === "monthly" ? "Monthly" : ""
            }`
          : "Donate"}
      </button>
    </form>
  );
};

export default DonationForm;
