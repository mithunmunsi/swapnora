import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <h1>Terms and Conditions</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our platform, you agree to be bound by these
            Terms and Conditions. If you do not agree with any part, please do
            not use the service.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 13 years old to use our platform. If under 18,
            you must have parental consent.
          </p>
        </section>

        <section>
          <h2>3. User Accounts</h2>
          <ul>
            <li>
              You are responsible for maintaining the confidentiality of your
              login information.
            </li>
            <li>
              Notify us immediately if you suspect unauthorized access to your
              account.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Donations and Transactions</h2>
          <p>
            All donations are voluntary and non-refundable unless otherwise
            stated. We use secure third-party payment processors.
          </p>
        </section>

        <section>
          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the platform for illegal purposes</li>
            <li>Impersonate others or misrepresent information</li>
            <li>Upload harmful, misleading, or offensive content</li>
          </ul>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>
            All platform content, trademarks, and branding belong to us unless
            otherwise stated. Users retain rights to their own posts.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            We are not liable for damages arising from the use of the platform
            or any third-party services linked to it.
          </p>
        </section>

        <section>
          <h2>8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>
            We may update these Terms periodically. Continued use of the
            platform after changes indicates your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            For any questions, contact us at{" "}
            <strong>support@[yourdomain].com</strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
