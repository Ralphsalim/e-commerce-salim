import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        .catch((err) => console.log(err));
    }
  };
  return (
    <section className="personal-info">
      <div
        style={{
          fontSize: "25px",
          margin: "0px 0px 10px 0px",
          paddingTop: "20px",
        }}
      >
        Register
      </div>

      {registrationError && (
        <div style={{ color: "red", textAlign:'center'}}>{registrationError}</div>
      )}

      <form className="personal-info-form" onSubmit={handleSubmit}>
        <div>
          <span>First name</span>
          <input
            type="text"
            name="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <span>Last name</span>
          <input
            type="text"
            name="first-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <span>Birth date</span>
          <input
            type="date"
            name="birth-date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />{" "}
        </div>

        <div>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />{" "}
        </div>

        <div>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
        </div>

        <div>
          <span>Phone Number</span>
          <input
            type="tel"
            name="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />{" "}
        </div>

        <div className="personal-info-form-submit">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
