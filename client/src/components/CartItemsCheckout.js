import { useSelector } from "react-redux";
import { TextValue } from "./CartItems";
import { ComponentCard } from "./ComponentCard";

const CartItemsCheckout = (props) => {
  const { style, page, onClick} = props;
  const totals = useSelector((state) => state.totals);
  return (
    <div className="cart-items-checkout">
      <TextValue text="Discounts" value="Apply Discount"></TextValue>
      {page !== "checkout" ? (
        <ComponentCard
          text={page !== "checkout?" ? "Login" : null}
          style={{ margin: "20px 0px 20px 0px", height: "45px" }}
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
      <ComponentCard
        text={page === "checkout?" ? "Thanks" : "Checkout"}
        style={{ marginTop: "40px", height: "45px" }}
        link={page === "checkout?" ? null : "checkout"}
        onClick={onClick}
      ></ComponentCard>
    </div>
  );
};

export default CartItemsCheckout;
