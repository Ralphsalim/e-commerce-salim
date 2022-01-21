import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <div style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
      <Navbar></Navbar>
      <div className="loginpage-content">
        <Login style={{ marginTop: "40px" }}></Login>
      </div>
    </div>
  );
}

export default LoginPage;
