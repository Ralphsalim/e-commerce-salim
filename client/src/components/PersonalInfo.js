import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecollapsables, updateOrder } from "../actions";

const PersonalInfo = (props) => {


  const dispatch = useDispatch();

  const collapsables_Controller = useSelector(
    (state) => state.collapsables_Controller
  );

  let indexOfCurrentCollapsable = 0;
  const controller = collapsables_Controller[indexOfCurrentCollapsable];
  let indexOfNextCollapsable = indexOfCurrentCollapsable + 1; //refers to the next element in the collapsables_Controller

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState ("")

  const handleSubmit = (e) => {
    //sets the current value of next element
    //sets the current value of is current to false
    //submits the form
    //makes the form editable
    //

    e.preventDefault();
    if ((phoneNumber && firstName && lastName, birthDate)) {

      dispatch(
        updateOrder({
          property: "personalInfo",
          value: { firstName, lastName, birthDate, phoneNumber },
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
    <section className="personal-info">
      <div
        style={{
          minHeight: minHeight(),
          fontSize: "25px",
          margin: "0px 0px 10px 0px",
          paddingTop: "20px",
        }}
      >
        Personal Info
      </div>
      {controller.isCurrent && (
        <form className="personal-info-form" onSubmit={handleSubmit}>
          <div>
            <span>First name</span>
            <input
              type="text"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <span>Last name</span>
            <input
              type="text"
              name="first-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <span>Birth date</span>
            <input
              type="date"
              name="birth-date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />{" "}
          </div>
          <div>
            <span>Phone Number</span>
            <input
              type="tel"
              name="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />{" "}
          </div>

          <div>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>

          <div className="personal-info-form-submit">
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default PersonalInfo;
