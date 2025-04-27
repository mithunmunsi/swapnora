import HeaderSection from "../components/HeaderSection";
import ProgressBar from "../components/ProgressBar";
import DonationForm from "../components/DonationForm";
import StorySection from "../components/StorySection";

const Donate = () => {
  return (
    <div className="container">
      <HeaderSection />
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <ProgressBar /> <br />
          <br />
          <StorySection />
        </div>
        <DonationForm />
      </div>
    </div>
  );
};

export default Donate;
