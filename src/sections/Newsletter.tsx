import newsletterBg from "../assets/newsletter-bg.webp";

const Newsletter = () => {
  return (
    <section
      className="section-newsletter"
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="master-header__box">
          <h1 className="master-header__heading">
            A Small Gift, A Big Change.
          </h1>

          <div className="optin">
            <p className="optin__text">
              Subscribe our newsletter and don't miss an update to new projects!
            </p>

            <form
              id="ck_subscribe_form"
              className="ck_subscribe_form optin__form"
              action="#"
              data-remote="true"
            >
              <input
                type="text"
                name="first_name"
                className="ck_first_name"
                id="ck_firstNameField"
                placeholder="First Name"
              />
              <input
                type="email"
                name="email"
                className="ck_email_address"
                id="ck_emailField"
                placeholder="Email Address"
              />
              <input type="hidden" name="id" value="90587" id="90587" />

              <button>YES, PLEASE!</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
