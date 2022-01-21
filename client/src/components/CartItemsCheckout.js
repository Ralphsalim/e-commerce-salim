import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextValue } from "./CartItems";
import { ComponentCard } from "./ComponentCard";

const CartItemsCheckout = (props) => {
  const { style, page, onClick } = props;
  const totals = useSelector((state) => state.totals);
  const cart = useSelector((state) => state.cart);
  const [isCartEmpty, setisCartEmpty] = useState(true);

  useEffect(() => {
    if (!Object.keys(cart).length) setisCartEmpty(true);
    else setisCartEmpty(false);
  }, [cart]);

  return (
    <div className="cart-items-checkout">
      <TextValue text="Discounts" value="Apply Discount"></TextValue>
      {page !== "checkout" ? (
        <ComponentCard
          text="Login"
          style={{ margin: "20px 0px 20px 0px", height: "45px" }}
          link="/login"
        ></ComponentCard>
      ) : null}
      <TextValue
        text="Order value"
        value={`Sek ${totals.total}`}
        style={{ borderTop: "1px solid grey", paddingTop: "20px" }}
      ></TextValue>
      <TextValue
        text="delivery"
        value={`Sek ${0}`}
        style={{ paddingTop: "10px", paddingBottom: "15px" }}
      ></TextValue>
      <TextValue
        text="Total:"
        value={`Sek ${totals.total}`}
        style={{
          borderTop: "1px solid grey",
          paddingTop: "15px",
          fontWeight: "bold",
          color: "black",
        }}
      ></TextValue>
      {page === "checkout" ? (
        <ComponentCard
          text="Almost done"
          style={{ marginTop: "40px", height: "45px" }}
        ></ComponentCard>
      ) : (
        !isCartEmpty && (
          <ComponentCard
            text={page === "checkout?" ? "Thanks" : "Checkout"}
            style={{
              marginTop: "40px",
              height: "45px",
            }}
            link={page === "checkout" ? null : "checkout"}
          ></ComponentCard>
        )
      )}
    </div>
  );
};

export default CartItemsCheckout;
