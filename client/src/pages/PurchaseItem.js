import React from "react";
import { SingleValue } from "../components/Cart";
import { TextValue } from "../components/CartItems";

function PurchaseItem(props) {
  const { product } = props;
  return (
    <div>
      <div className="cart">
        <div className="cart-item">
          <img src={product.image}></img>
        </div>

        <div className="cart-info">
          <TextValue text={product.name}></TextValue>
          <TextValue text="Item No." value={product._id}></TextValue>
          <TextValue text="Color" value={product.color}></TextValue>
          <TextValue text="Size." value={product.size}></TextValue>
          <TextValue text="Price" value={product.price}></TextValue>
          <TextValue text="Quantity" value={product.quantity}></TextValue>

          <TextValue
            text="Total"
            value={`Sek ${product.price * product.quantity}`}
            style={{ color: "black", fontWeight: "bold" }}
            styleValue={{ fontWeight: "bold" }}
          ></TextValue>
        </div>
      </div>
    </div>
  );
}

export default PurchaseItem;
