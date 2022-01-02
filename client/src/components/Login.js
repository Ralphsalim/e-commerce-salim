import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteoverlay, setUser } from "../actions";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailErrors, setemailErrors] = useState("");
  const [passwordErrors, setpasswordErrors] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("http://localhost:5000/api/v1/login", { email, password })
        .then((res) => {
          console.log(res.data);
          const user = res.data.user;
          const info = res.data.info;
          if (!user) {
            if (info.field === "email") setemailErrors(info.message);
            if (info.field === "password") setpasswordErrors(info.message);
          } else {
            dispatch(setUser(res.data.user));
            dispatch(deleteoverlay());
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login">
      <div className="login-text">Login</div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <span>{emailErrors}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <span>{passwordErrors}</span>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
