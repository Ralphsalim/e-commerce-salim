import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import OverlayCard from "../components/OverlayCard";
import Login from "../components/Login";
import CartItems from "../components/CartItems";
import FavoriteItems from "../components/FavoriteItems";
import Slider from "../components/Slider";
import { ComponentCard } from "../components/ComponentCard";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import { deleteoverlay } from "../actions";
import men from "../images/men.jpeg";
import ladies from "../images/ladies.jpg";
import accessories from "../images/accessories.jpg";

function Home() {
  const overlay = useSelector((state) => state.overlay);
  const dispatch = useDispatch();
  const componentStyles = {
    padding: "0px 30px 0px 30px",
    width: "100px",
    marginRight: "20px",
    marginLeft: "20px",
    fontWeight: "bold",
  };

  //removes the overlay on page reload
  useEffect(() => {
    dispatch(deleteoverlay());
  }, []);

  return (
    <div
      style={{
        overflowY: overlay ? "hidden" : "scroll",
        height: overlay ? "100vh" : "",
        marginTop: overlay ? "0px" : "",
        backgroundColor: "whitesmoke",
      }}
    >
      <Navbar></Navbar>
      <Slider>
        <ComponentCard
          state={{ category: "women" }}
          text="Ladies"
          link={"/products"}
          style={componentStyles}
        ></ComponentCard>

        <ComponentCard
          state={{ category: "men" }}
          text="Men"
          link={"/products"}
          style={componentStyles}
        ></ComponentCard>
      </Slider>
      <section
        style={{
          display: "flex",
          paddingBottom: "30px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "30px",
          alignItems: "center",
        }}
        className="productpage-main"
      >
        <CategoryCard
          to="/products"
          state={{ category: "men" }}
          name="Men"
          img={men}
        ></CategoryCard>

        <CategoryCard
          to="/products"
          state={{ category: "women" }}
          name="Ladies"
          img={ladies}
        ></CategoryCard>
        <CategoryCard
          to="/products"
          state={{ category: "accessories" }}
          name="Accessories"
          img={accessories}
        ></CategoryCard>
      </section>

      {overlay ? (
        <OverlayCard
          components={{
            ACCOUNT: <Login></Login>,
            FAVORITE: <FavoriteItems></FavoriteItems>,
            CART: <CartItems></CartItems>,
          }}
        ></OverlayCard>
      ) : null}
      <Footer></Footer>
    </div>
  );
}

export default Home;
