import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setregistrationError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //sets the current value of next element
    //sets the current value of is current to false
    //submits the form
    //makes the form editable
    //

    e.preventDefault();
    if (phoneNumber && firstName && lastName && birthDate && password) {
      axios
        .post("http://localhost:5000/api/v1/user", {
          firstname: firstName,
          lastname: lastName,
          birthDate: birthDate,
          password: password,
          email: email,
          phonenumber: phoneNumber,
        })
        .then((res) => {
          if (res.data.status === "success") {
            navigate("/");
          } else {
            setregistrationError(res.data.message);
          }
        })
        .catch((err) => setregistrationError(err));
    }
  };
  return (
    <section
      className="login "
      style={{
        maxHeight: "none",
        backgroundColor: "white",
      }}
    >
      <div className="login-text">Register</div>

      {registrationError && (
        <div style={{ color: "red", textAlign: "center" }}>
          <span> {registrationError}</span>
        </div>
      )}
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="login-div">
            <input
              type="text"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Firstname"
            />
          </div>
          <div className="login-div">
            <input
              type="text"
              name="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Lastname"
            />
          </div>
          <div className="login-div">
            <input
              type="date"
              name="birth-date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              placeholder="Birthday"
            />{" "}
          </div>

          <div className="login-div">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />{" "}
          </div>

          <div className="login-div">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />{" "}
          </div>

          <div className="login-div">
            <input
              type="tel"
              name="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Phone number"
            />{" "}
          </div>

          <div className="login-div">
            <button type="submit">Register</button>
          </div>

          <div className="login-div">
            <Link to="/login" style={{ color: "blue" }}>
              {" "}
              Go To Login Page{" "}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
