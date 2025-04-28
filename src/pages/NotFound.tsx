import { useNavigate } from "react-router-dom";
import "../styles/notfound.css"; // ✅ External CSS

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="notfound-container">
      <section className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-message">
          Looks like you’ve followed a broken link or entered a URL that doesn’t
          exist.
        </p>
        <button className="notfound-button" onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </section>
    </main>
  );
};

export default NotFound;
