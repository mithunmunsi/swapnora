import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="success-container">
      <section className="success-content">
        <h1 className="success-title">🎉 Payment Successful!</h1>
        <p className="success-message">
          Thank you for your contribution! Your payment was processed
          successfully.
        </p>
        <p className="success-redirect">
          You will be redirected to the homepage shortly.
        </p>
        <button className="success-button" onClick={() => navigate("/")}>
          Go Home Now
        </button>
      </section>
    </main>
  );
};

export default Success;
