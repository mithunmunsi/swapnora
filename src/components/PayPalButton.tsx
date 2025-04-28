const PayPalButton = () => {
  return (
    <div className="PayPal">
      <form
        action="https://www.paypal.com/donate/?hosted_button_id=RHUEZP5CSVBGS"
        method="post"
        target="_blank"
        className="paypal-form"
      >
        <input
          className="paypal-submit-button"
          type="submit"
          value="Donate Now"
        />
        <img
          src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg"
          alt="Accepted cards"
        />
        <section className="paypal-powered">
          Powered by{" "}
          <img
            src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
            alt="PayPal"
            className="paypal-logo"
          />
        </section>
      </form>
    </div>
  );
};

export default PayPalButton;
