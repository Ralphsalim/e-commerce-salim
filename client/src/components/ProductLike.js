import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfavourite, deletefavorite } from "../actions";

const ProductLike = (props) => {
  const { product, style} = props;
  const dispatch = useDispatch();
  const [isFavorited, setisFavorited] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  const updateFavorites = (product) => {
    if (isFavorited) dispatch(deletefavorite(product._id));
    else dispatch(addfavourite(product));
    setisFavorited((prev) => !prev);
  };

  const styles={cursor:'pointer', ...style}
  return (
    <span className="product-like" onClick={() => updateFavorites(product)} style={styles}>
      {favorites[product._id] | isFavorited ? (
        <Favorite sx={{ color: "red" }}></Favorite>
      ) : (
        <FavoriteBorderIcon></FavoriteBorderIcon>
      )}
    </span>
  );
};

export default ProductLike;
