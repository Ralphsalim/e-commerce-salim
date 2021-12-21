import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import { ComponentCard } from "./ComponentCard";

function FavoriteItems() {
  const favorites = useSelector((state) => state.favorites);
  const [isfavoritesEmpty, setisfavoritesEmpty] = useState(true);

  useEffect(() => {
    console.log("favorites is empty ", isfavoritesEmpty);

    if (Object.keys(favorites).length) setisfavoritesEmpty(false);
    else setisfavoritesEmpty(true);
  }, [favorites]);

  return (
    <div>
      <div className="cart-items-text">Favorites</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "30px",
          justifyContent: "space-evenly",
        
        }}
      >
        {Object.keys(favorites).map((key) => {
          return <Product product={favorites[key]}></Product>;
        })}
      </div>
      {isfavoritesEmpty ? (
        <div className="cart-items-empty" style={{marginTop:'150px',height:'100%'}} >
          {" "}
          <ComponentCard text="Favorites Is Empty"></ComponentCard>
        </div>
      ) : null}
    </div>
  );
}

export default FavoriteItems;
