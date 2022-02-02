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
  const { productVariant } = props;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totals = useSelector((state) => state.totals);


  //deletes item from the cart in store using the productVariant id
  //also deletes it from the totals in store
  const deleteCartItem = (id) => {
    dispatch(deletecartitem(id));
    dispatch(initializecarttotals({ variantId: id }));
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
        <img src={productVariant.image}></img>
        <ProductLike
          productVariant={{
            ...productVariant,
            variantId: productVariant._id + "-" + productVariant.color,
          }}
        ></ProductLike>
        <span
          className="cart-item-delete"
          onClick={() => deleteCartItem(productVariant.variantId)}
          style={{ right: "10px", position: "absolute", top: "0px" }}
        >
          <Delete sx={{ fontSize: "20px" }}></Delete>
        </span>
      </div>

      <div className="cart-info">
        <TextValue text={productVariant.name}></TextValue>
        <TextValue text="Price" value={productVariant.price}></TextValue>
        <TextValue text="Item No." value={productVariant._id}></TextValue>
        <TextValue text="Color" value={productVariant.color}></TextValue>
        <TextValue text="Size." value={productVariant.size}></TextValue>
        <TextValue
          text="Total"
          value={`Sek ${totals[productVariant.variantId].total}`}
          style={{ color: "black", fontWeight: "bold" }}
          styleValue={{ fontWeight: "bold" }}
        ></TextValue>

        <div className="cart-quantity">
          <SingleValue
            value="-"
            onClick={() =>
              handleQuantity(productVariant.variantId, "decrement")
            }
          />

          <SingleValue
            value={totals[productVariant.variantId].quantity}
            style={{ backgroundColor: "white", color: "black" }}
          />

          <SingleValue
            value="+"
            onClick={() =>
              handleQuantity(productVariant.variantId, "increment")
            }
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
    marginTop: "30px",
    ...style,
  };
  return (
    <span onClick={onClick} style={styles}>
      {value}
    </span>
  );
};

export default Cart;
