import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecollapsables } from "../actions";

function BillingInfo() {
  const dispatch = useDispatch();
  const collapsables_Controller = useSelector(
    (state) => state.collapsables_Controller
  );

  let indexOfCurrentCollapsable = 1;
  const controller = collapsables_Controller[indexOfCurrentCollapsable];
  let indexOfNextCollapsable = indexOfCurrentCollapsable + 1; //refers to the next element in the collapsables_Controller

  const handleChange = () => {};

  const handleSubmit = (e) => {
    //sets the current value of next element
    //sets the current value of is current to false
    //submits the form
    //makes the form editable
    //
    dispatch(
      updatecollapsables({
        current: indexOfCurrentCollapsable,
        next: indexOfNextCollapsable,
      })
    );
  };

  const minHeight = () => {
    if (!controller.isCurrent) {
      return "100px";
    }
    return "0px";
  };

  return (
    <section className="billing-info">
      <div style={{ minHeight: minHeight(),fontSize:'25px', margin:'0px 0px 10px 0px', paddingTop:'20px' }}>Billing Information</div>
      {controller.isCurrent && (
        <form className="personal-info-form" onSubmit={handleSubmit}>
          <div>
            <span>Additional Adress</span>
            <input type="text" name="first-name" id="first-name" />
          </div>
          <div>
            <span>address</span>
            <input type="text" name="address" id="first-name" />
          </div>
          <div>
            <span>Postal Code</span>
            <input type="text" name="postal-code" id="birth-date" />{" "}
          </div>
          <div>
            <span>Location</span>
            <input type="text" name="location" id="" />{" "}
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
