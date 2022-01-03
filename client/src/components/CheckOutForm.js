import React from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

const CheckoutForm = (props) => {
  const { orderId } = props;
  const currentOrder = useSelector((state) => state.currentOrder);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    //posts the order to the server

    const order = {
      personalInfo: currentOrder.personalInfo,
      billingInfo: currentOrder.billingInfo,
      deliveryInfo: currentOrder.deliveryInfo,
    };

    axios.post("http://localhost:5000/api/v1/orders", order, {
      params: { id: orderId },
    });

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://e-commerce-salim.herokuapp.com/" },
    });

    if (result.error) console.log(result.error.message);
  };

  //makes the component collapsable
  const collapsables_Controller = useSelector(
    (state) => state.collapsables_Controller
  );

  let indexOfCurrentCollapsable = 2;
  const controller = collapsables_Controller[indexOfCurrentCollapsable];
  let indexOfNextCollapsable = indexOfCurrentCollapsable + 1; //refers to the next element in the collapsables_Controller

  const minHeight = () => {
    if (!controller.isCurrent) {
      return "100px";
    }
    return "0px";
  };

  return (
    <form onSubmit={handleSubmit} className="checkoutform">
      <div
        className="checkoutform-header"
        style={{
          minHeight: minHeight(),
          fontSize: "25px",
          margin: "0px 0px 10px 0px",
          paddingTop: "20px",
        }}
      >
        Payment Information
      </div>
      {controller.isCurrent && (
        <div className="checkoutform-form">
          <PaymentElement />
          <button
            disabled={!stripe}
            style={{
              marginTop: "30px",
              backgroundColor: "black",
              color: "white",
              height: "45px",
            }}
          >
            Pay
          </button>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
