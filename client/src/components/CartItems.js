import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { clearcart, cleartotals, setclientsecret } from "../actions";
import { ComponentCard } from "./ComponentCard";
import CartItemsCheckout from "./CartItemsCheckout";

function CartItems() {
  console.log(window.innerWidth);
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

  //resets the items in cart to null
  //resets the totals to null
  const handleClick = () => {
    dispatch(cleartotals());
    dispatch(clearcart());
  };

  return (
    <div className="cart-items">
      <div className="cart-items-text">Cart</div>
      {!isCartEmpty && (
        <div className="cart-items-menu">
          {/* <ComponentCard
          component={<ArrowBackIcon></ArrowBackIcon>}
          text="Continue Shopping"
          link="/"
        ></ComponentCard> */}

          <ComponentCard
            component={<DeleteIcon></DeleteIcon>}
            text="Empty Cart"
            style={{
              padding: "0px 30px 0px 30px",
              margin: "10px 10px 0px 10px",
            }}
            onClick={handleClick}
          ></ComponentCard>

          <ComponentCard
            component={<ArrowForwardIcon></ArrowForwardIcon>}
            text="Checkout"
            reverse={true}
            link={isCartEmpty ? null : "/checkout"}
            style={{
              padding: "0px 30px 0px 30px",
              margin: "10px 10px 0px 10px",
            }}
          ></ComponentCard>
        </div>
      )}
      <div className="cart-items-main">
        <div
          className="cart-items-product"
          style={
            isCartEmpty
              ? {
                  justifyContent: "center",
                  maxHeight: "250px",
                  minWidth: "250px",
                  maxWidth: "350px",
                  minHeight: "250px",
                }
              : {}
          }
        >
          {cart
            ? Object.keys(cart).map((key) => (
                <Cart productVariant={cart[key]} key={key}></Cart>
              ))
            : null}
          {isCartEmpty ? (
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
              Cart is Empty{" "}
            </span>
          ) : null}
        </div>
        <CartItemsCheckout page="home"></CartItemsCheckout>
      </div>
    </div>
  );
}

export const TextValue = (props) => {
  const { text, value, style, styleValue } = props;

  let styles = {
    display: "flex",
    justifyContent: "space-between",
    color: "grey",
    fontWidth: "12px",
    marginBottom: "5px",
    ...style,
  };

  return (
    <section style={styles}>
      <div>{text}</div>
      <div style={styleValue}>{value}</div>
    </section>
  );
};

export default CartItems;
