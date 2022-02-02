import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteoverlay } from "../actions";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Register from "../components/Register";
function RegisterPage() {

  const dispatch = useDispatch();
  //removes the overlay on page reload
  useEffect(() => {
    dispatch(deleteoverlay());
  }, []);

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Navbar></Navbar>
      <div
        className="registerpage-content"
        style={{ marginTop: "80px", display: "flex", justifyContent: "center" }}
      >
        <Register></Register>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default RegisterPage;
