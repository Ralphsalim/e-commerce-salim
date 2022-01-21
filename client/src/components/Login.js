import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  deleteoverlay,
  setloginredirect,
  setsuccessmessage,
  setUser,
} from "../actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TenMp } from "@mui/icons-material";

function Login(props) {
  const { style } = props;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailErrors, setemailErrors] = useState("");
  const [passwordErrors, setpasswordErrors] = useState("");
  const dispatch = useDispatch();
  const loginRedirect = useSelector((state) => state.loginRedirect);
  const navigate = useNavigate();
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
            dispatch(setsuccessmessage("Logged In"));

            //navigates to appropriate page after succesive login
            if (loginRedirect) {
              const temp = loginRedirect;
              dispatch(setloginredirect(""));
              navigate(temp);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="login"
      style={{
        border: " 1px solid whitesmoke",
        ...style,
        backgroundColor: "white",
      }}
    >
      <div className="login-text">Login</div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
