import React from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://e-commerce-salim.herokuapp.com/" },
    });

    if (result.error) console.log(result.error.message);
  };
  return (
    <form onSubmit={handleSubmit} className="checkoutform">
      <div className="checkoutform-header">CheckOut</div>
      <div className="checkoutform-form">
        <PaymentElement />
        <button disabled={!stripe}>Pay</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
