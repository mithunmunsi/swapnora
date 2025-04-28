import HeaderSection from "../components/HeaderSection";
import ProgressBar from "../components/ProgressBar";
import StorySection from "../components/StorySection";

const Donate = () => {
  return (
    <main className="donate-page">
      <div className="donate-page-container">
        <HeaderSection />
        <div className="donate-content-grid">
          <div className="donate-left-column">
            <ProgressBar />
            <StorySection />
          </div>
          <div className="donate-right-column">
            <div id="paypal-container-TXFWV5H78FSQC"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Donate;
