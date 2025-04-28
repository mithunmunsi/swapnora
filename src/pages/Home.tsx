import DonationFeed from "../components/DonationFeed";
import About from "../sections/About";
import Featured from "../sections/FeaturedProjects";
import Hero from "../sections/Hero";
import Impacts from "../sections/StatSection";
import Newsletter from "../sections/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Featured />
      <Impacts />
      <DonationFeed />
      <Newsletter />
    </div>
  );
};

export default Home;
