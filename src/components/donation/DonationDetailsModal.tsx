interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  donation: any;

  onClose: () => void;
}

const DonationDetailsModal = ({ donation, onClose }: Props) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Donation Receipt</h2>

        <div className="receipt-grid">
          <div>
            <strong>Donation Type</strong>

            <p>{donation.donationType}</p>
          </div>

          <div>
            <strong>Amount</strong>

            <p>€{donation.amount.toFixed(2)}</p>
          </div>

          <div>
            <strong>Credits Earned</strong>

            <p>{donation.creditsEarned}</p>
          </div>

          <div>
            <strong>Status</strong>

            <p>{donation.paymentStatus}</p>
          </div>

          <div>
            <strong>Date</strong>

            <p>{new Date(donation.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <strong>Reference</strong>
            <p>
              DON-
              {donation._id.slice(-6).toUpperCase()}
            </p>
          </div>

          {donation.project && (
            <>
              <div>
                <strong>Project</strong>

                <p>{donation.project.title}</p>
              </div>

              <div>
                <strong>Category</strong>

                <p>{donation.project.category}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsModal;
