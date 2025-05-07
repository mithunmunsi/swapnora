import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>
        <p>
          <strong>Last Updated:</strong> [Insert Date]
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>
            <strong>a. Personal Information You Provide:</strong>
          </p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Donation history</li>
            <li>Profile photo (optional)</li>
          </ul>

          <p>
            <strong>b. Automatically Collected Data:</strong>
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser and device type</li>
            <li>Page visits and interaction</li>
            <li>Cookies and tracking data</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Process donations</li>
            <li>Display project impact</li>
            <li>Personalize experience</li>
            <li>Prevent fraud</li>
            <li>Send important updates</li>
          </ul>
        </section>

        <section>
          <h2>3. Sharing of Information</h2>
          <p>
            We <strong>do not sell or rent</strong> your personal data. We may
            share with:
          </p>
          <ul>
            <li>Trusted partners (with consent)</li>
            <li>Payment processors</li>
            <li>Legal authorities when required</li>
          </ul>
        </section>

        <section>
          <h2>4. Your Data Rights</h2>
          <p>You may have the right to:</p>
          <ul>
            <li>Access and update data</li>
            <li>Delete your account</li>
            <li>Withdraw consent</li>
          </ul>
          <p>
            To exercise rights, contact:{" "}
            <strong>privacy@[yourdomain].com</strong>
          </p>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>
            We retain data as long as needed to provide our services and fulfill
            legal obligations.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            We use cookies to improve user experience and track usage. You may
            disable cookies in your browser.
          </p>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>
            We protect your information using encryption, HTTPS, and regular
            audits.
          </p>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>We do not knowingly collect data from children under 13.</p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this page occasionally. Changes will be posted here
            with a new effective date.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            <strong>Email:</strong> privacy@[yourdomain].com
            <br />
            <strong>Address:</strong> [Your Company Address]
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
