import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecollapsables, updateOrder } from "../actions";

function BillingInfo() {
  const dispatch = useDispatch();
  const collapsables_Controller = useSelector(
    (state) => state.collapsables_Controller
  );

  let indexOfCurrentCollapsable = 1;
  const controller = collapsables_Controller[indexOfCurrentCollapsable];
  let indexOfNextCollapsable = indexOfCurrentCollapsable + 1; //refers to the next element in the collapsables_Controller

  //

  const [postalCode, setPostalCode] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [houseNumber, sethouseNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //sets the current value of next element
    //sets the current value of is current to false
    //submits the form
    //makes the form editable
    //
    if (postalCode && city && street && houseNumber) {
      dispatch(
        updateOrder({
          property: "billingInfo",
          value: { postalCode, street, city, houseNumber },
        })
      );

      dispatch(
        updatecollapsables({
          current: indexOfCurrentCollapsable,
          next: indexOfNextCollapsable,
        })
      );
    }
  };

  const minHeight = () => {
    if (!controller.isCurrent) {
      return "100px";
    }
    return "0px";
  };

  return (
    <section className="billing-info">
      <div
        style={{
          minHeight: minHeight(),
          fontSize: "25px",
          margin: "0px 0px 10px 0px",
          paddingTop: "20px",
        }}
      >
        Billing Information
      </div>
      {controller.isCurrent && (
        <form className="personal-info-form" onSubmit={handleSubmit}>
          <div>
            <span>Street </span>
            <input
              type="text"
              name="street"
              value={street}
              onChange={(e) => setstreet(e.target.value)}
            />
          </div>
          <div>
            <span>Apartment Number</span>
            <input
              type="text"
              name="flat-number"
              value={houseNumber}
              onChange={(e) => sethouseNumber(e.target.value)}
            />
          </div>
          <div>
            <span>Postal Code</span>
            <input
              type="text"
              name="postal-code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />{" "}
          </div>
          <div>
            <span>City</span>
            <input
              type="text"
              name="city"
              id=""
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />{" "}
          </div>

          <div className="personal-info-form-submit">
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </section>
  );
}

export default BillingInfo;
