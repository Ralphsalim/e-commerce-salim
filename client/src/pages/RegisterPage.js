import React from "react";
import Navbar from "../components/Navbar";
import Register from '../components/Register'
function RegisterPage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="registerpage-content">
        <Register></Register>
      </div>
    </div>
  );
}

export default RegisterPage;
