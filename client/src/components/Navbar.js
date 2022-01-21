import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setoverlay } from "../actions";
import SuccessMessage from "../components/SuccessMessage";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { setsuccessmessage } from "../actions";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

function Navbar() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const [favoritesLength, setfavoritesLength] = useState(0);
  const totals = useSelector((state) => state.totals);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [successMessage, setsuccessMessage] = useState("");

  const statusMessages = useSelector((state) => state.statusMessages);
  //displays the overlaycard component
  //content depends on the action
  const handleClick = (action) => {
    if (action === "ACCOUNT" && user) {
      //redirect user to my account if logged in
      navigate("/mypage");
    } else dispatch(setoverlay(action));
  };

  useEffect(() => {
    setfavoritesLength(() => Object.keys(favorites).length);
  }, [favorites]);

  useEffect(() => {
    if (!statusMessages.success) return;
    const message = statusMessages.success;
    setsuccessMessage(message);
    dispatch(setsuccessmessage(""));
    setTimeout(() => {
      setsuccessMessage("");
    }, 2000);
  }, [statusMessages]);

  useEffect(() => {}, [statusMessages]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "30px",
            color: "black",
            marginLeft: "20px",
          }}
        >
          SM{" "}
        </Link>
      </div>
      <div className="navbar-right">
        <span onClick={() => handleClick("CART")}>
          {totals.quantity ? (
            <span style={styles}>{totals.quantity}</span>
          ) : null}
          <ShoppingBagOutlinedIcon
            sx={{ fontSize: "28px" }}
          ></ShoppingBagOutlinedIcon>
        </span>

        <span onClick={() => handleClick("FAVORITE")}>
          {favoritesLength ? (
            <span style={styles}>{favoritesLength}</span>
          ) : null}
          <FavoriteBorderOutlinedIcon
            sx={{ fontSize: "28px" }}
          ></FavoriteBorderOutlinedIcon>
        </span>

        <span onClick={() => handleClick("ACCOUNT")}>
          <PersonOutlineOutlinedIcon
            sx={{ fontSize: "35px" }}
          ></PersonOutlineOutlinedIcon>
        </span>
      </div>

      {/* <div style={{ position: "absolute", bottom: "0px", right: "0px" }}>
      
      </div> */}

      {successMessage && (
        <SuccessMessage
          message={successMessage}
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "30px",
            zIndex: "400",
          }}
        ></SuccessMessage>
      )}
    </div>
  );
}

const styles = {
  position: "absolute",
  top: "-20px",
  left: "20px",
  height: "20px",
  backgroundColor: "black",
  color: "white",
  width: "20px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "10px",
};

export default Navbar;
