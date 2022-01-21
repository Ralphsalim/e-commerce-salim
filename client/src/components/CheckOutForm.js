import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

const CheckoutForm = (props) => {
  const currentOrder = useSelector((state) => state.currentOrder);
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const totals = useSelector((state) => state.totals);
  const elements = useElements();
  const [orderId, setOrderId] = useState("");
  const client_Secret = useSelector((state) => state.client_Secret);
  const paymentIntentId = useSelector((state) => state.paymentIntentId);
  const cart = useSelector((state) => state.cart);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    //posts the order to the server
    let userId = "";
    if (user) {
      userId = user._id;
    }

    const cartProducts = Object.keys(cart);

    
     const response = await axios.patch(
       "api/v1/checkout-session",
      // { currentOrder, cartProducts, totals },
      {currentOrder},
       {
         params: { paymentIntentId, orderId: currentOrder.orderId, userId },
     }
    );

    // //the order id will be used to query the created order
    // //when the payment fails and user retries payment
    // setOrderId(response.data.orderId);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "http://localhost:3000" },
    });

    if (result.error) {
      console.log(result.error.message);
    }
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
