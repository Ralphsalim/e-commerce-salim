import Favorite from "@mui/icons-material/Favorite";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addcartitem,
  addcartitems,
  addfavourite,
  deletecartitem,
  deletecartitems,
  deletefavorite,
  initializecarttotals,
} from "../actions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

//favrites functionality

/*
click on favorite button 
item added to favorites in state 
update count on the favorites icon 

*/

function Product(props) {
  const dispatch = useDispatch();
  const { product } = props;
  const productRef = useRef(null);
  const [productHeight, setproductHeight] = useState(0);

  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  const [isFavorited, setisFavorited] = useState(false);
  const [isCartItem, setisCartItem] = useState(false);

  //useEffect for getting and setting the height of the product image
  //relies on the width of the image
  useEffect(() => {
    const width = productRef.current.offsetWidth;
    const height = width + width / 3;
    setproductHeight(height);
  }, [productRef]);

  //updates is cart item when state chenges by deleting item from store
  //deletes happen in the CartItems component
  useEffect(() => {
    if (cart[product._id]) setisCartItem(true);
    else setisCartItem(false);
  }, [cart[product._id]]);

  useEffect(() => {
    if (favorites[product._id]) setisFavorited(true);
    else setisFavorited(false);
  }, [favorites[product._id]]);

  //adds and removes items to favorites by updating favorites in state
  const updateFavorites = (product) => {
    if (isFavorited) dispatch(deletefavorite(product._id));
    else dispatch(addfavourite(product));

    setisFavorited((prev) => !prev);
  };

  //
  const updateCart = (product) => {
    if (isCartItem) {
      dispatch(deletecartitem(product._id));
      dispatch(initializecarttotals({ price: product.price, id: product._id }));
    } else {
      dispatch(addcartitem(product));
      dispatch(initializecarttotals({ price: product.price, id: product._id }));
    }

    setisCartItem((prev) => !prev);
  };

  return (
    <div className="product" ref={productRef}>
      <div className="product-img">
        <span className="product-like" onClick={() => updateFavorites(product)}>
          {favorites[product._id] | isFavorited ? (
            <Favorite sx={{ color: "red" }}></Favorite>
          ) : (
            <FavoriteBorderIcon></FavoriteBorderIcon>
          )}
        </span>
        <img
          src={product.url}
          alt=""
          style={{ height: productHeight + "px" }}
        />
      </div>
      <div className="product-info">
        <span>{product.price} kr</span> <br />
        <span>{product.name}</span>
      </div>

      <div className="product-add-to-cart" onClick={() => updateCart(product)}>
        {isCartItem ? "Added To Cart" : "Add To Cart"}
      </div>
    </div>
  );
}

export default Product;
