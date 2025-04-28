import HeaderSection from "../components/HeaderSection";
import ProgressBar from "../components/ProgressBar";
import DonationForm from "../components/DonationForm";
import StorySection from "../components/StorySection";

const Donate = () => {
  return (
    <div className="donate-page-container">
      <HeaderSection />
      <div className="donate-content-grid">
        <div className="donate-left-column">
          <ProgressBar />
          <StorySection />
        </div>
        <div className="donate-right-column">
          <DonationForm />
        </div>
      </div>
    </div>
  );
};

export default Donate;
