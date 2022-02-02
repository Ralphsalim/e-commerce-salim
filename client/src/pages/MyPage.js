import { display } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setloginredirect, setUser } from "../actions";
import { ComponentCard } from "../components/ComponentCard";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import PersonalInfo from "../components/PersonalInfo";
import PurchaseItems from "./PurchaseItems";

function MyPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(setloginredirect("/mypage"));
      navigate("/login");
    }
  }, []);

  const stylesButton = {
    backgroundColor: "white",
    color: "black",
    margin: "10px 10px 10px 10px ",
    border: "1px solid grey",
  };

  const [view, setview] = useState("");

  const defaultsPersonalInfo = (user) => {
    return {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      birthDate: user.birthDate,
      phoneNumber: user.phonenumber,
      birthDate: user.birthDate,
    };
  };

  const defaultsBillingInfo = (user) => {
    return {
      postalCode: user.billingAdress.postalCode,
      city: user.billingAdress.city,
      street: user.billingAdress.street,
      houseNumber: user.billingAdress.houseNumber,
    };
  };

  const [isMobileDevice, setisMobileDevice] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showDisplay, setshowDisplay] = useState(true);
  const [viewWidth, setviewWidth] = useState(window.innerWidth);

  const getViewWidth = () => {
    if (window.innerWidth < 700) setisMobileDevice(true);
    else setisMobileDevice(false);
    setviewWidth(() => window.innerWidth);
    console.log("resizing");
    console.log(viewWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getViewWidth);

    return () => {
      window.removeEventListener("resize", getViewWidth);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 700) setisMobileDevice(() => true);
    else {
      setisMobileDevice(() => false);
    }
  }, [viewWidth]);

  //display is hidden by default on mobile devices
  useEffect(() => {
    if (isMobileDevice) setshowDisplay(() => false);
    else setshowDisplay(() => true);
  }, [isMobileDevice]);

  const goBack = () => {
    setshowDisplay((prev) => !prev);
    setShowMenu((prev) => !prev);
    console.log("go back ");
  };

  const handleClick = (state) => {
    if (isMobileDevice) {
      setShowMenu((prev) => !prev);
      setshowDisplay((prev) => !prev);
      setview(state);
    } else {
      setview(state);
    }
  };

  const mobileDeviceStyles = {
    minWidth: "100%",
    maxWidth: "100%",
  };

  return (
    <div className="mypage">
      <Navbar></Navbar>
      <div className="mypage-content" style={{ marginTop: "80px" }}>
        {showMenu && (
          <section
            className="mypage-content-left"
            style={isMobileDevice ? mobileDeviceStyles : {}}
          >
            <ComponentCard
              text="Personal Info"
              style={stylesButton}
              onClick={() => handleClick("personalInfo")}
            ></ComponentCard>

            <ComponentCard
              text="Purchases"
              style={stylesButton}
              onClick={() => handleClick("purchases")}
            ></ComponentCard>
            <ComponentCard
              text="Address"
              style={stylesButton}
              onClick={() => handleClick("address")}
            ></ComponentCard>
          </section>
        )}
        {showDisplay && (
          <section className="mypage-content-right">
            {isMobileDevice && (
              <div>
                <ComponentCard
                  text="Back"
                  style={{
                    ...stylesButton,
                    maxWidth: "250px",
                    marginTop: "30px",
                  }}
                  onClick={goBack}
                ></ComponentCard>
              </div>
            )}

            {view === "personalInfo" ? (
              <PersonalInfoMyPage
                defaults={defaultsPersonalInfo(user)}
              ></PersonalInfoMyPage>
            ) : null}

            {view === "purchases" ? <PurchaseItems></PurchaseItems> : null}

            {view === "address" ? (
              <BillingInfoMyPage
                defaults={defaultsBillingInfo(user)}
              ></BillingInfoMyPage>
            ) : null}
          </section>
        )}{" "}
      </div>

      <Footer></Footer>
    </div>
  );
}

const PersonalInfoMyPage = (props) => {
  const user = useSelector((state) => state.user);
  const { defaults } = props;
  console.log(defaults);
  const [firstName, setFirstName] = useState(defaults.firstName);
  const [lastName, setLastName] = useState(defaults.lastName);
  const [birthDate, setBirthDate] = useState(defaults.birthDate);
  const [phoneNumber, setPhoneNumber] = useState(defaults.phoneNumber);
  const [email, setEmail] = useState(defaults.email);
  const [isEditMode, setisEditMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      phoneNumber &&
      firstName &&
      lastName &&
      birthDate &&
      email &&
      phoneNumber
    ) {
      axios.patch(
        "http://localhost:5000/api/v1/user",
        {
          phonenumber: phoneNumber,
          birthDate: birthDate,
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
        { params: { id: user._id } }
      );
    }
  };

  return (
    <section
      className="personal-info"
      style={{ paddingTop: "30px", paddingBottom: "30px" }}
    >
      <div
        style={{
          fontSize: "25px",
          margin: "0px 0px 50px 0px",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span> Personal Info </span>
        {!isEditMode && (
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => setisEditMode(true)}
          >
            Edit
          </span>
        )}
      </div>

      {!isEditMode ? (
        <div style={{ border: "1px solid whitesmoke", padding: "10px" }}>
          <FormValuePropert
            value={defaults.email}
            property="Email"
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.birthDate}
            property="Birth Date"
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.firstName}
            property="First Name "
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.lastName}
            property="Last Name "
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.email}
            property="Email"
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.phoneNumber}
            property="Phone Number"
          ></FormValuePropert>
        </div>
      ) : null}

      {isEditMode ? (
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
            <button onClick={() => setisEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : null}
    </section>
  );
};

function FormValuePropert(props) {
  const { property, value } = props;

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          color: "grey",
          marginTop: "4px",
          marginBottom: "4px",
          fontSize: "15px",
        }}
      >
        {property}
      </div>
      <div style={{ color: "black", fontWeight: "bold", fontSize: "19px" }}>
        {value}
      </div>
    </div>
  );
}

function BillingInfoMyPage(props) {
  const user = useSelector((state) => state.user);
  const { defaults } = props;
  const dispatch = useDispatch();

  const [postalCode, setPostalCode] = useState(defaults.postalCode);
  const [city, setcity] = useState(defaults.city);
  const [street, setstreet] = useState(defaults.street);
  const [houseNumber, sethouseNumber] = useState(defaults.houseNumber);
  const [isEditMode, setisEditMode] = useState(false);

  //sends the data to db for update
  //returns updated user, sets the user in store
  const handleSubmit = (e) => {
    e.preventDefault();

    //all fields must be valid
    if (postalCode && city && street && houseNumber) {
      axios
        .patch(
          "http://localhost:5000/api/v1/user",
          { billingAdress: { street, houseNumber, postalCode, city } },
          { params: { id: user._id } }
        )
        .then((res) => {
          dispatch(setUser(res.data));
          setisEditMode(false); //closes the component, from edit to read only
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="billing-info">
      <div
        style={{
          fontSize: "25px",
          margin: "0px 0px 50px 0px",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span> Billing Info </span>
        {!isEditMode && (
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => setisEditMode(true)}
          >
            Edit
          </span>
        )}
      </div>

      {!isEditMode ? (
        <div style={{ border: "1px solid whitesmoke", padding: "10px" }}>
          <FormValuePropert
            value={defaults.street}
            property="Street"
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.houseNumber}
            property="Door Number "
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.postalCode}
            property="Postal Code"
          ></FormValuePropert>

          <FormValuePropert
            value={defaults.city}
            property="City"
          ></FormValuePropert>
        </div>
      ) : null}

      {isEditMode ? (
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
            <button onClick={() => setisEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

export default MyPage;
