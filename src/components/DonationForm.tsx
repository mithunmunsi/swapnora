// src/components/DonationForm.tsx
import React, { useState } from "react";

const DonationForm = () => {
  const [selectedTab, setSelectedTab] = useState<"one-time" | "monthly">(
    "monthly"
  );
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState<number | "">("");
  const [anonymous, setAnonymous] = useState(false);
  const [dedicate, setDedicate] = useState(false);

  const predefinedAmounts = [20, 50, 100, 250];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(Number(e.target.value));
    setSelectedAmount(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountToDonate = customAmount || selectedAmount;
    console.log({
      type: selectedTab,
      amount: amountToDonate,
      anonymous,
      dedicate,
    });
    // Proceed with API call or payment flow
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-lg"
    >
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => setSelectedTab("one-time")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedTab === "one-time"
              ? "bg-pink-500 text-white"
              : "bg-white border"
          }`}
        >
          One Time
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("monthly")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedTab === "monthly"
              ? "bg-pink-500 text-white"
              : "bg-white border"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Predefined Amounts */}
      <div className="grid grid-cols-2 gap-4">
        {predefinedAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handleAmountSelect(amount)}
            className={`p-4 border rounded-lg flex flex-col items-start space-y-1 ${
              selectedAmount === amount
                ? "border-pink-500 bg-pink-50"
                : "border-gray-300"
            }`}
          >
            <span className="text-lg font-bold">${amount}</span>
            <span className="text-xs text-gray-500">
              Monthly donation for education support
            </span>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Custom Amount {selectedTab === "monthly" && "Monthly"}
        </label>
        <div className="flex items-center">
          <span className="px-3 py-2 bg-gray-200 rounded-l-md">$</span>
          <input
            type="number"
            min="1"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter custom amount"
            className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
            className="accent-pink-500"
          />
          <label className="text-sm">
            Show my name as anonymous when displaying my donation publicly
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={dedicate}
            onChange={() => setDedicate(!dedicate)}
            className="accent-pink-500"
          />
          <label className="text-sm">Dedicate this donation</label>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-3 rounded-full font-semibold"
      >
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
