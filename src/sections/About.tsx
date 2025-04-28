import aboutUS from "../assets/about-us.png";
const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="tag text-center">Who Are We?</div>
        <div className="tag-details">
          <h1 className="heading-secondary text-center">
            Tiny Drops Make Mighty Oceans of Hope.
          </h1>
        </div>

        <div className="two-column-section">
          <div className="left-column">
            <div className="">
              <div className="tag">OUR STORY</div>
              <h2 className="tagline">
                Nonprofits get to the heart of many matters
              </h2>
            </div>
            <div className="about_card abt-bg">
              <p className="paragraph">
                We are a non-profit organization focused on helping communities
                through impactful projects funded by people like you. We believe
                nonprofits shouldn’t sacrifice their means to satisfy their
                missions. That’s why Give Lively was created. We are a
                philanthropist-funded, social impact–driven tech company that
                collaborates directly with nonprofits to build better
                fundraising tech and give it away to them for free.
              </p>
              <img
                src="https://cdn.prod.website-files.com/60995de2aeb0c3a6f1ec3f77/60995de2aeb0c3bc98ec41de_story-buble.png"
                loading="lazy"
                width="108"
                alt=""
                className="about_card-img"
              />
            </div>
            <div className="about_card">
              <p className="paragraph">
                Our goal is to help nonprofits of all sizes take advantage of
                the digital fundraising movement by dramatically improving the
                giving experience for everyone – nonprofits and donors alike.
                Did we mention we give our technology to nonprofits for free?
                Seriously.
              </p>
            </div>
          </div>

          <div className="right-column">
            <img src={aboutUS} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
