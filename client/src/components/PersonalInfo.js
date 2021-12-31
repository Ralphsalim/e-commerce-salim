import { useDispatch, useSelector } from "react-redux";
import { updatecollapsables } from "../actions";

const PersonalInfo = () => {
  const dispatch = useDispatch();

  const collapsables_Controller = useSelector(
    (state) => state.collapsables_Controller
  );

  let indexOfCurrentCollapsable = 0;
  const controller = collapsables_Controller[indexOfCurrentCollapsable];
  let indexOfNextCollapsable = indexOfCurrentCollapsable + 1; //refers to the next element in the collapsables_Controller

  const handleChange = () => {};

  const handleSubmit = (e) => {
    //sets the current value of next element
    //sets the current value of is current to false
    //submits the form
    //makes the form editable
    //

    e.preventDefault();
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
    <section className="personal-info">
      <div style={{minHeight: minHeight(), fontSize:'25px', margin:'0px 0px 10px 0px', paddingTop:'20px' }}>
        Personal Info
      </div>
      {controller.isCurrent && (
        <form className="personal-info-form" onSubmit={handleSubmit}>
          <div>
            <span>First name</span>
            <input type="text" name="first-name" id="first-name" />
          </div>
          <div>
            <span>Last name</span>
            <input type="text" name="first-name" id="first-name" />
          </div>
          <div>
            <span>Birth date</span>
            <input type="date" name="birth-date" id="birth-date" />{" "}
          </div>
          <div>
            <span>Phone Number</span>
            <input type="tel" name="tel" id="tel" />{" "}
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
