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
          img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        ></CategoryCard>

        <CategoryCard
          to="/products"
          state={{ category: "women" }}
          name="Ladies"
          img="https://eg.hm.com/sites/g/files/hm/assets-shared/HNM/13478951/03a4d287ed390fddec7e97bc727cf65dee4c9b5e/1/03a4d287ed390fddec7e97bc727cf65dee4c9b5e.jpg"
        ></CategoryCard>
        <CategoryCard
          to="/products"
          state={{ category: "accessories" }}
          name="Accessories"
          img="https://scontent.farn2-1.fna.fbcdn.net/v/t1.6435-9/101491533_109517050781180_5581582933438758912_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_ohc=oMiq-S7Om3MAX8jv7vF&_nc_ht=scontent.farn2-1.fna&oh=00_AT-QLCbLIAiOjWZmeSR4jUWeXMNryqordhePQtDManPffw&oe=6221A21F"
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
