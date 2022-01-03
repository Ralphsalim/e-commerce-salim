import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="loginpage-content">
        <Login></Login>
      </div>
    </div>
  );
}

export default LoginPage;
