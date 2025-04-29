import { motion } from "framer-motion";
import FeatureImg1 from "../assets/featuredi-1.jpg";
import FeatureImg2 from "../assets/featuredi-2.jpg";
import FeatureImg3 from "../assets/featuredi-3.jpg";
import Profile1 from "../assets/profile.png";
import Profile2 from "../assets/woman.png";

interface FeaturedItem {
  href: string;
  imgSrc: string;
  alt: string;
  title: string;
  desc: string;
  endDate: string;
  raised?: number;
  goal?: number;
}
const featuredData: FeaturedItem[] = [
  {
    href: "https://www.paypal.com/donate/?hosted_button_id=RHUEZP5CSVBGS",
    imgSrc: FeatureImg3,
    alt: "Providing clean drinking water in rural areas.",
    title: "Clean Water Initiative",
    desc: "Providing clean drinking water in rural areas.",
    raised: 300,
    goal: 2400,
    endDate: "2026-05-10", // <-- Add ISO date
  },
  {
    href: "https://www.paypal.com/donate/?hosted_button_id=RHUEZP5CSVBGS",
    imgSrc: FeatureImg2,
    alt: "Helping children with essential school materials.",
    title: "School Supplies Drive",
    desc: "Helping children with essential school materials.",
    endDate: "2026-05-15",
    raised: 785,
    goal: 2000,
  },
  {
    href: "https://www.paypal.com/donate/?hosted_button_id=RHUEZP5CSVBGS",
    imgSrc: FeatureImg1,
    alt: "Organizing free medical checkups in remote villages.",
    title: "Health Camp",
    desc: "Organizing free medical checkups in remote villages.",
    endDate: "2026-05-05",
    raised: 1289,
    goal: 2400,
  },
];

const FeaturedProjects = () => {
  return (
    <section
      className="featured-section"
      role="region"
      aria-label="Featured donation projects"
    >
      <div className="featured-container">
        {/* Header */}
        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="featured-tag">Featured Projects</div>
          <h2 className="featured-title">Donate for Upcoming Projects</h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="featured-grid">
          {featuredData.map((item, idx) => {
            const progress = Math.min(
              ((item.raised || 0) / (item.goal || 1)) * 100,
              100
            );

            const today = new Date();
            const end = item.endDate ? new Date(item.endDate) : today;
            const timeDiff = end.getTime() - today.getTime();
            const daysLeft = Math.max(
              Math.ceil(timeDiff / (1000 * 60 * 60 * 24)),
              0
            );

            return (
              <motion.div
                key={idx}
                className="featured-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
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
                    <p className="featured-amount">{item.raised}€</p>

                    <p className="featured-days">
                      {daysLeft > 0
                        ? `${daysLeft} Day${daysLeft > 1 ? "s" : ""} to Go`
                        : "Ends Today"}
                    </p>
                  </div>

                  <div className="featured-progress-bar">
                    <div
                      className="featured-progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="featured-profiles">
                    <div className="profile-images">
                      <img src={Profile1} alt="Dan" className="profile-image" />
                      <img
                        src={Profile2}
                        alt="Tiina"
                        className="profile-image"
                      />
                    </div>

                    <div className="profile-names">
                      <span>Dan, </span>
                      <span>Tiina, </span>
                      <span>and Others</span>
                    </div>

                    <div className="donate-button-container">
                      <a
                        href={item.href}
                        target="_blank"
                        className="donate-link"
                        rel="noopener noreferrer"
                      >
                        Donate
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
