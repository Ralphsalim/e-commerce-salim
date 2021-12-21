import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setclientsecret } from "../actions";
import { ComponentCard } from "./ComponentCard";

function CartItems() {
  const cart = useSelector((state) => state.cart);
  const [isCartEmpty, setisCartEmpty] = useState(true);
  const totals = useSelector((state) => state.totals);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //determines if cart is empty depending on the keys in cart object
  //iscartEmpty, used to toggle TextCard component(cart is Empty)
  useEffect(() => {
    if (Object.keys(cart).length) setisCartEmpty(false);
    else setisCartEmpty(true);
  }, [cart]);

  //sends the cart items to the databse
  //returns a client secrete which will be used to charge the customer
  //see store
  const checkout = () => {
    let items = {};

    //makes sure that only valid ids exist
    Object.keys(totals).forEach((key) => {
      if (
        key !== "total" &&
        key !== "quantity" &&
        key !== "undefined" &&
        key !== "null"
      ) {
        return (items = {
          ...items,
          [key]: { quantity: totals[key].quantity },
        });
      }
    });

    axios
      .post("/api/v1/create-checkout-session", items)
      .then((res) => {
        dispatch(setclientsecret(res.data.clientSecret));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cart-items">
      <div className="cart-items-text">Cart</div>
      <div className="cart-items-menu">
        <ComponentCard
          component={<ArrowBackIcon></ArrowBackIcon>}
          text="Continue Shopping"
          link="/"
        ></ComponentCard>

        <ComponentCard
          component={<DeleteIcon></DeleteIcon>}
          text="Empty Cart"
        ></ComponentCard>

        <ComponentCard
          component={<ArrowForwardIcon></ArrowForwardIcon>}
          text="Checkout"
          reverse={true}
          onClick={checkout}
          link="/checkout"
        ></ComponentCard>
      </div>
      {cart
        ? Object.keys(cart).map((key) => (
            <Cart product={cart[key]} key={key}></Cart>
          ))
        : null}

      {isCartEmpty ? (
        <div className="cart-items-empty">
          <ComponentCard text="Cart Is Empty"></ComponentCard>
        </div>
      ) : null}
    </div>
  );
}

export default CartItems;
