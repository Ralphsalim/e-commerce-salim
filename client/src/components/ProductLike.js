import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfavourite, deletefavorite } from "../actions";

const ProductLike = (props) => {
  const { style, productVariant } = props;

  const dispatch = useDispatch();
  const [isFavorited, setisFavorited] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  
  const updateFavorites = () => {
    if (isFavorited) dispatch(deletefavorite(productVariant.variantId));
    else dispatch(addfavourite(productVariant));
    setisFavorited((prev) => !prev);
  };

  //checks to see if the product is favorited
  useEffect(() => {
    setisFavorited(() => {
      if (favorites[productVariant.variantId]) return true;
      else return false;
    });
  }, [favorites[productVariant.variantId]]);

  const styles = { cursor: "pointer", ...style };
  return (
    <span
      className="product-like"
      onClick={() => updateFavorites()}
      style={styles}
    >
      {favorites[productVariant.variantId] | isFavorited ? (
        <Favorite sx={{ color: "red" }}></Favorite>
      ) : (
        <FavoriteBorderIcon></FavoriteBorderIcon>
      )}
    </span>
  );
};

export default ProductLike;
