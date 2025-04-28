import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cancel: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="cancel-page">
      <section className="cancel-content">
        <h1>Payment Cancelled</h1>
        <p>It looks like you cancelled the checkout process.</p>
        <p>If this was a mistake, you can try again.</p>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </section>
    </main>
  );
};

export default Cancel;
