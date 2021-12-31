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

function Checkout() {
  const dispatch = useDispatch();
  const client_Secret = useSelector((state) => state.client_Secret);
  const options = {
    clientSecret: client_Secret,
    appearance: { theme: "stripe" },
  };

  return (
    <div className="Checkout">
      <Navbar></Navbar>
      <div className="Checkout-content">
        <div className="checkout-left">
          <PersonalInfo></PersonalInfo>
          <BillingInfo></BillingInfo>
          {client_Secret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm></CheckoutForm>
            </Elements>
          ) : (
            null
          )}
        </div>
        <div className="checkout-right">
          <CartItemsCheckout page="checkout"></CartItemsCheckout>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

// function Checkout() {
//   const totals = useSelector((state) => state.totals);

//   return (
//     <Elements stripe={stripePromise} options={getClientSecret(totals)}>
//       <CheckoutForm></CheckoutForm>
//     </Elements>
//   );
// }

// const getClientSecret = async (totals) => {
//   const items = checkout(totals);
//   const { data: options } = await axios.post(
//     "http://localhost:7000/api/v1/create-checkout-session",
//     items
//   );
//   return options;
// };

// const checkout = (totals) => {
//   let items = {};

//   //makes sure that only valid ids exist
//   Object.keys(totals).forEach((key) => {
//     if (
//       key !== "total" &&
//       key !== "quantity" &&
//       key !== "undefined" &&
//       key !== "null"
//     ) {
//       return (items = {
//         ...items,
//         [key]: { quantity: totals[key].quantity },
//       });
//     }
//   });
//   return items;
// };

// export default Checkout;
