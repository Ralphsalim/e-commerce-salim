import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setoverlay } from "../actions";

function Navbar() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const [favoritesLength, setfavoritesLength] = useState(0);
  const totals = useSelector((state) => state.totals);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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

  return (
    <div className="navbar">
      <div className="navbar-left">Cubus</div>
      <div className="navbar-right">
        <span onClick={() => handleClick("CART")}>
          {totals.quantity ? (
            <span style={styles}>{totals.quantity}</span>
          ) : null}
          <ShoppingBagIcon sx={{ fontSize: "30px" }}></ShoppingBagIcon>
        </span>

        <span onClick={() => handleClick("FAVORITE")}>
          {favoritesLength ? (
            <span style={styles}>{favoritesLength}</span>
          ) : null}
          <FavoriteIcon sx={{ fontSize: "30px" }}></FavoriteIcon>
        </span>

        <span onClick={() => handleClick("ACCOUNT")}>
          <PersonIcon sx={{ fontSize: "35px" }}></PersonIcon>
        </span>
      </div>
    </div>
  );
}

const styles = {
  position: "absolute",
  top: "-23px",
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
