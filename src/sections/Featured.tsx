const featuredData = [
  {
    href: "/member-stories/point-of-pride",
    imgSrc:
      "https://cdn.prod.website-files.com/60995de2aeb0c37606ec3f7e/64c2d9bfcd13c672d2730f4b_PoP%20hero%20image.jpeg",

    title: "Clean Water Initiative",
    desc: " Providing clean drinking water in rural areas.",
  },
  {
    href: "/member-stories/austin-farm-sanctuary",
    imgSrc:
      "https://cdn.prod.website-files.com/60995de2aeb0c37606ec3f7e/663bf4dbd799233db772ecf8_Untitled-1_0002_Austin-Farm-Sanctuary.png",

    title: "School Supplies Drive",
    desc: "Helping children with essential school materials.",
  },
  {
    href: "/member-stories/the-tech-interactive",
    imgSrc:
      "https://cdn.prod.website-files.com/60995de2aeb0c37606ec3f7e/663bf4f0e33983dfdaf06be9_Untitled-1_0001_The-Tech.png",

    title: "Health Camp",
    desc: "Organizing free medical checkups in remote villages.",
  },
];

const Featured = () => {
  return (
    <section className="featured-section">
      <div className="container">
        <div className="tag text-center">Featured Projects</div>
        <div className="tag-details">
          <h2 className="heading-secondary text-center">
            Donate for upcoming projects
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredData.map((item, idx) => (
            <div key={idx} className="featured_item">
              <div className="featured_image-wrapper">
                <img
                  src={item.imgSrc}
                  alt=""
                  className="featured_image large-card"
                  loading="lazy"
                />
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
                <a href={item.href} className="featured_item-link">
                  <div className="read-more">Read more</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
