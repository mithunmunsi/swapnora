import { useState } from "react";

interface Project {
  id: string;
  name: string;
}

const MakeDonation = () => {
  const [projects] = useState<Project[]>([
    { id: "1", name: "Clean Water for All" },
    { id: "2", name: "Education for Girls" },
    { id: "3", name: "Medical Camp Support" },
  ]);

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [message, setMessage] = useState<string>("");

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || amount <= 0) {
      setMessage("Please select a project and enter a valid amount.");
      return;
    }

    // In real app, send this data to the backend
    setMessage(
      `Thank you for donating $${amount} to "${
        projects.find((p) => p.id === selectedProject)?.name
      }"!`
    );
    setAmount(0);
    setSelectedProject("");
    setPaymentMethod("card");
  };

  return (
    <div className="make-donation">
      <h2>Make a Donation</h2>
      <form onSubmit={handleDonate} className="donation-form">
        <label>Choose Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          required
        >
          <option value="">-- Select a Project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <label>Donation Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          min={1}
          required
        />

        <label>Payment Method</label>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
        </div>

        <button type="submit">Donate Now</button>
        {message && <p className="donation-message">{message}</p>}
      </form>
    </div>
  );
};

export default MakeDonation;
