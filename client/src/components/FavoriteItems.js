import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import { ComponentCard } from "./ComponentCard";
import SuccessMessage from "./SuccessMessage";

function FavoriteItems() {
  const favorites = useSelector((state) => state.favorites);
  const [isfavoritesEmpty, setisfavoritesEmpty] = useState(true);
  const products = useSelector((state) => state.products);


  useEffect(() => {
    if (Object.keys(favorites).length) setisfavoritesEmpty(false);
    else setisfavoritesEmpty(true);
  }, [favorites]);

  return (
    <div style={{ postion: "relative" }}>
       
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
          const _id = favorites[key]._id;
          return (
            <>
              <Product
                productVariant={favorites[key]}
                product={products[_id]}
                key={key}
                page={"favorites"}
              ></Product>
            </>
          );
        })}
      </div>
      {isfavoritesEmpty ? (
        <div
          className="cart-items-empty"
          style={{
            display: "flex",
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: "auto",
            marginLeft: "auto",

            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "250px",
            minWidth: "250px",
            maxWidth: "250px",
            minHeight: "250px",
          }}
        >
          {" "}
          <span style={{ fontSize: "25px", fontWeight: "bold" }}>
            {" "}
            No Favorite Items{" "}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default FavoriteItems;
