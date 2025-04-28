import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const brandLogos = [
  {
    href: "https://www.philanthropy.com/article/soros-heir-is-offering-nonprofits-free-online-giving-tools-really/#.W7IvwYjK4KF",
    src: "https://cdn.prod.website-files.com/60995de2aeb0c3a6f1ec3f77/60995de2aeb0c39134ec420d_philantropy.png",
    alt: "The Chronicle of Philanthropy logo",
  },
  {
    href: "https://www.theguardian.com/small-business-network/2017/jun/20/squaring-the-circle-on-jargon-why-do-we-speak-in-riddles-at-work",
    src: "https://cdn.prod.website-files.com/60995de2aeb0c3a6f1ec3f77/60995de2aeb0c359b9ec4205_guardian.png",
    alt: "The Guardian logo",
  },
  {
    href: "https://www.salesforce.org/blog/an-overview-of-donor-management-software/",
    src: "https://cdn.prod.website-files.com/60995de2aeb0c3a6f1ec3f77/60995de2aeb0c31c70ec4212_salesforce.png",
    alt: "Salesforce logo",
  },
  {
    href: "https://www.ibtimes.com/donald-trump-undoes-barack-obamas-legacy-how-thank-former-president-his-wife-donate-2482747",
    src: "https://cdn.prod.website-files.com/60995de2aeb0c3a6f1ec3f77/60995de2aeb0c31674ec4216_international.png",
    alt: "International Business Times logo",
  },
];

const Brands = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="brands-section">
      <div className="brands-container">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={2000}
          autoplay={
            isMobile ? false : { delay: 2000, disableOnInteraction: false }
          }
          slidesPerView={isMobile ? 2 : "auto"}
          spaceBetween={30}
          grabCursor={true}
          className="brands-swiper"
        >
          {brandLogos.map((brand, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <a
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="brands-link"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  loading="lazy"
                  className="brands-logo"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
