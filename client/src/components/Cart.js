import Delete from "@mui/icons-material/Delete";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletecartitem,
  initializecarttotals,
  updatecarttotals,
} from "../actions";

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
        <img
          src="https://assets.vogue.com/photos/5f341f6f4721c86585cbb800/master/pass/fullsizeoutput_6bcd_1_1080x.jpg"
          alt="image"
        />
      </div>
      <div className="cart-info">
        <div style={{ display: "block" }}>
          <div>
            <select name="size" id="size">
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div>
            <select name="size" id="size">
              <option value="xxxl">Xtra Large</option>
            </select>
          </div>
        </div>
        <div className="cart-item-price">{product.price} kr </div>
        <div className="cart-quantity">
          <span onClick={() => handleQuantity(product._id, "decrement")}>
            -
          </span>
          <span>{totals[product._id].quantity}</span>
          <span onClick={() => handleQuantity(product._id, "increment")}>
            +
          </span>
        </div>
        <div className="cart-total">{totals[product._id].total} kr</div>
        <div
          className="cart-item-delete"
          onClick={() => deleteCartItem(product._id)}
        >
          <Delete></Delete>
        </div>
      </div>
    </div>
  );
}

export default Cart;
