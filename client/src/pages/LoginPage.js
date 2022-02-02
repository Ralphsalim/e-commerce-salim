import React from "react";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <div style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
      <Navbar></Navbar>
      <div className="loginpage-content">
        <Login style={{ marginTop: "40px" }}></Login>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default LoginPage;
