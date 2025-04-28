import newsletterBg from "../assets/newsletter-bg.webp";

const Newsletter = () => {
  return (
    <section
      className="newsletter"
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="newsletter__content">
        <header className="newsletter__header">
          <h1 className="newsletter__title">A Small Gift, A Big Change.</h1>
        </header>

        <div className="newsletter__optin">
          <p className="newsletter__description">
            Subscribe to our newsletter and don't miss an update on new
            projects!
          </p>

          <form
            id="newsletter_form"
            className="newsletter__form"
            action="#"
            data-remote="true"
          >
            <input
              type="text"
              name="first_name"
              className="newsletter__input"
              id="newsletter_first_name"
              placeholder="First Name"
              required
            />
            <input
              type="email"
              name="email"
              className="newsletter__input"
              id="newsletter_email"
              placeholder="Email Address"
              required
            />
            <input type="hidden" name="id" value="90587" />

            <button className="newsletter__submit">YES, PLEASE!</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
