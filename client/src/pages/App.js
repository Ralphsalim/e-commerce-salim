import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../index";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Register from "../Register";
import Cart from "../components/Cart";
import Checkout from "./Checkout";
import { setproducts } from "../actions";
import OverlayCard from "../components/OverlayCard";
import Favorite from "@mui/icons-material/Favorite";
import CartItems from "../components/CartItems";
import FavoriteItems from "../components/FavoriteItems";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const overlay = useSelector((state) => state.overlay);

  //retrieves products from data base
  useEffect(() => {
    axios.get("/api/v1/products").then((res) => {
      dispatch(setproducts(res.data));
    });
  }, []);
  return (
    <div
      className="App"
      style={{
        overflowY: overlay ? "hidden" : "scroll",
        height: overlay ? "100vh" : '',
      }}
    >
      <Navbar></Navbar>
      <div className="content">
        {products
          ? products.map((product) => {
              return <Product key={product._id} product={product}></Product>;
            })
          : null}

        {overlay ? (
          <OverlayCard
            components={{
              ACCOUNT: <Login></Login>,
              FAVORITE: <FavoriteItems></FavoriteItems>,
              CART: <CartItems></CartItems>,
            }}
          ></OverlayCard>
        ) : null}
      </div>
    </div>
  );
}

export default App;
