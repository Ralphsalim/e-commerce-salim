import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckOutForm";
import stripePromise from "../stripe/stripePromise";
import Navbar from "../components/Navbar";
import Collapsable from "../components/Collapsable";
import PersonalInfo from "../components/PersonalInfo";
import BillingInfo from "../components/BillingInfo";
import CartItemsCheckout from "../components/CartItemsCheckout";
import { setclientsecret, setpaymentintentid, updateOrder } from "../actions";
import Footer from "../components/Footer";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totals = useSelector((state) => state.totals);
  const client_Secret = useSelector((state) => state.client_Secret);
  const cart = useSelector((state) => state.cart);
  const [paymentIntentId, setpaymentIntentId] = useState("");
  const currentOrder = useSelector((state) => state.currentOrder);

  const page = "checkout";
  const options = {
    clientSecret: client_Secret,
    appearance: { theme: "stripe" },
  };

  useEffect(() => {
    console.log(Object.keys(cart));
    if (!Object.keys(cart).length) {
      navigate("/");
    }
  }, []);
  //sends the cart items to the databse
  //returns a client secrete which will be used to charge the customer
  //see store

  const checkout = () => {
    let items = Object.values(totals);
    items = items.filter((item) => typeof item === "object");

    //will create acheckout session and also an order document in the db where
    //additional information on the order will be stored

    axios
      .post("/api/v1/checkout-session", {
        items,
        orderId: currentOrder.orderId,
      })
      .then((res) => {
        dispatch(setclientsecret(res.data.clientSecret));
        dispatch(setpaymentintentid(res.data.paymentIntentId));
        dispatch(updateOrder({ property: "orderId", value: res.data.orderId }));
      })
      .catch((err) => console.log(err));
  };

  //creates a payment intent if one doesnot exist ie if the client secret is falsey
  //will only run if there is no order that has already been created
  //
  useEffect(() => {
    if (Object.keys(cart).length && !client_Secret) {
      checkout();
    }
  }, []);

  return (
    <div className="Checkout">
      <Navbar></Navbar>
      <div className="Checkout-content" style={{ marginTop: "80px" }}>
        <div className="checkout-left">
          <PersonalInfo></PersonalInfo>
          <BillingInfo></BillingInfo>
          {client_Secret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm></CheckoutForm>
            </Elements>
          ) : null}
        </div>
        <div className="checkout-right">
          <CartItemsCheckout page={page}></CartItemsCheckout>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Checkout;
