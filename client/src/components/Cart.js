import Delete from "@mui/icons-material/Delete";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletecartitem,
  initializecarttotals,
  updatecarttotals,
} from "../actions";
import ProductLike from "./../components/ProductLike";
import { TextValue } from "./CartItems";

function Cart(props) {
  const { product } = props;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totals = useSelector((state) => state.totals);

  //deletes item from the cart in store using the product id
  //also deletes it from the totals in store
  const deleteCartItem = (id) => {
    dispatch(deletecartitem(id));
    dispatch(initializecarttotals({ id }));
  };

  const handleQuantity = (id, action) => {
    //quantity of items in cart or totals must always be truthy.
    //falsy values must be deleted from cart and totals
    if (totals[id].quantity === 1 && action === "decrement") {
      dispatch(initializecarttotals({ id }));
      dispatch(deletecartitem(id));
    } else dispatch(updatecarttotals({ id: id, action: action }));
  };

  return (
    <div className="cart">
      <div className="cart-item">
        <img src={product.url}></img>
        <ProductLike product={product}></ProductLike>
        <span
          className="cart-item-delete"
          onClick={() => deleteCartItem(product._id)}
          style={{ right: "10px", position: "absolute", top:'0px'}}
        >
          <Delete sx={{fontSize:'20px'}}></Delete>
        </span>
      </div>

      <div className="cart-info">
        <TextValue text={product.name}></TextValue>
        <TextValue text="Price" value={product.price}></TextValue>
        <TextValue text="Item No." value="7654356789"></TextValue>
        <TextValue text="Color" value="red"></TextValue>
        <TextValue text="Size." value="XS"></TextValue>
        <TextValue
          text="Total"
          value={`Sek ${totals[product._id].total}`}
          style={{color:'black', fontWeight:'bold'}}
          styleValue={{fontWeight:'bold'}}
        ></TextValue>

        <div className="cart-quantity">
          <SingleValue
            value="-"
            onClick={() => handleQuantity(product._id, "decrement")}
          />

          <SingleValue
            value={totals[product._id].quantity}
            style={{ backgroundColor: "white", color: "black" }}
          />

          <SingleValue
            value="+"
            onClick={() => handleQuantity(product._id, "increment")}
          />
        </div>
      </div>
    </div>
  );
}

export const SingleValue = (props) => {
  const { onClick, style, value } = props;
  let styles = {
    backgroundColor: "black",
    color: "white",
    display: "flex",
    width: "50px",
    height: "25px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    marginTop:'30px',
    ...style,
  };
  return (
    <span onClick={onClick} style={styles}>
      {value}
    </span>
  );
};

export default Cart;
