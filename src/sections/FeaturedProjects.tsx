import FeatureImg1 from "../assets/featuredi-1.jpg";
import FeatureImg2 from "../assets/featuredi-2.jpg";
import FeatureImg3 from "../assets/featuredi-3.jpg";
import FeatureImg4 from "../assets/featuredi-4.jpg";
import Profile1 from "../assets/profile.png";
import Profile2 from "../assets/woman.png";

const featuredData = [
  {
    href: "/member-stories/point-of-pride",
    imgSrc: FeatureImg3,
    alt: "Providing clean drinking water in rural areas.",
    title: "Clean Water Initiative",
    desc: "Providing clean drinking water in rural areas.",
  },
  {
    href: "/member-stories/austin-farm-sanctuary",
    imgSrc: FeatureImg2,
    alt: "Helping children with essential school materials.",
    title: "School Supplies Drive",
    desc: "Helping children with essential school materials.",
  },
  {
    href: "/member-stories/the-tech-interactive",
    imgSrc: FeatureImg1,
    alt: "Organizing free medical checkups in remote villages.",
    title: "Health Camp",
    desc: "Organizing free medical checkups in remote villages.",
  },
  {
    href: "/member-stories/the-tech-interactive",
    imgSrc: FeatureImg4,
    alt: "Flood relief in Bangladesh.",
    title: "Flood Relief Bangladesh",
    desc: "Helping flood-affected communities in Bangladesh.",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-header">
          <div className="featured-tag">Featured Projects</div>
          <h2 className="featured-title">Donate for Upcoming Projects</h2>
        </div>

        <div className="featured-grid">
          {featuredData.map((item, idx) => (
            <div key={idx} className="featured-item">
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="featured-image"
                loading="lazy"
              />

              <div className="featured-content">
                <h3 className="featured-item-title">{item.title}</h3>
                <p className="featured-item-description">{item.desc}</p>

                <div className="featured-divider"></div>

                <div className="featured-stats">
                  <p className="featured-amount">1289€</p>
                  <p className="featured-days">5 Days to Go</p>
                </div>

                <div className="featured-progress-bar">
                  <div
                    className="featured-progress"
                    style={{ width: "54%" }}
                  ></div>
                </div>

                <div className="featured-profiles">
                  <div className="profile-images">
                    <img src={Profile1} alt="Dan" className="profile-image" />
                    <img src={Profile2} alt="Tiina" className="profile-image" />
                  </div>

                  <div className="profile-names">
                    <span>Dan, </span>
                    <span>Tiina, </span>
                    <span>and Others</span>
                  </div>

                  <div className="donate-button-container">
                    <a href={item.href} className="donate-link">
                      Donate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
