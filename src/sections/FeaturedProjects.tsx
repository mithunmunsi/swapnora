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
    desc: " Providing clean drinking water in rural areas.",
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

    alt: "Organizing free medical checkups in remote villages.",

    title: "Flood Relief Bangladesh",
    desc: "Organizing free medical checkups in remote villages.",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="featured-section">
      <div className="container">
        <div className="content-header">
          <div className="tag text-center">Featured Projects</div>
          <div className="tag-details">
            <h2 className="heading-secondary text-center">
              Donate for upcoming projects
            </h2>
          </div>
        </div>
        <div className="content-body grid md:grid-cols-4 gap-6">
          {featuredData.map((item, idx) => (
            <div key={idx} className="featured_item">
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="featured_img"
                loading="lazy"
              />

              <div className="featured_text shadow-md">
                <h3 className="heading-tertiary">{item.title}</h3>
                <p className="description">{item.desc}</p>
                <div className="divider"></div>

                {/* Progress Bar */}
                <div className="flex justify-between">
                  <p>1289€</p> <p>5 Days to Go</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full"
                    style={{ width: "54%" }}
                  />
                </div>
                <div className="profile-container">
                  <div className="profile">
                    <img src={Profile1} alt="Dan" className="profile-img" />
                    <img src={Profile2} alt="Tiina" className="profile-img" />
                  </div>

                  <div className="profile-name">
                    <span>Dan, </span>
                    <span>Tiina </span>
                    <span>and Others</span>
                  </div>

                  <div className="donate-container">
                    <a href={item.href} className="featured_item-link">
                      <div className="donate-button">Donate</div>
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
