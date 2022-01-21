import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../index";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";
import Checkout from "./Checkout";
import { setproducts } from "../actions";
import OverlayCard from "../components/OverlayCard";
import Favorite from "@mui/icons-material/Favorite";
import CartItems from "../components/CartItems";
import FavoriteItems from "../components/FavoriteItems";
import { Outlet, Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const overlay = useSelector((state) => state.overlay);
  const [viewWidth, setviewWidth] = useState(window.innerWidth);
  const [viewheight, setViewheight] = useState(window.innerHeight);

  const setWidth = () => {
    setViewheight(window.innerHeight);
    setviewWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  //retrieves products from data base
  useEffect(() => {
    axios.get("/api/v1/products").then((res) => {
      console.log(res.data);
      dispatch(setproducts(res.data));
    });
  }, []);

  return (
    <div
      className="App"
      style={{
        overflowY: overlay ? "hidden" : "scroll",
        height: overlay ? "100vh" : "",
        marginTop: overlay ? "0px" : "60px",
      }}
    >
      <Navbar></Navbar>

      <Outlet></Outlet>

      <div className="app-content">
        <div className="app-content-left"></div>
        <div className="app-content-center">
          {Object.keys(products)
            ? Object.values(products).map((product) => {
                const colorOptions = product.variants.map((el) => el.color);
                const productVariant = {
                  name: product.name,
                  price: product.variants[0].sizes[0].price,
                  color: product.variants[0].color,
                  sizes: product.variants[0].sizes,
                  _id: product._id,
                  image: product.variants[0].images[0],
                  variantId: product._id + "-" + product.variants[0].color,
                  colorOptions,
                };

                return (
                  <Product
                    key={productVariant._id}
                    productVariant={productVariant}
                    product={product}
                    page={"products"}
                  ></Product>
                );
              })
            : null}
        </div>
      </div>

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
  );
}

export default App;
