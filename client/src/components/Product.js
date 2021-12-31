import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addcartitem,
  addfavourite,
  deletecartitem,
  deletefavorite,
  initializecarttotals,
} from "../actions";

import ProductLike from "./ProductLike";

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
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  //useEffect for getting and setting the height of the product image
  //relies on the width of the image
  useEffect(() => {
    const width = productRef.current.offsetWidth;
    const height = width + width / 2.5;
    setproductHeight(height);
  }, [viewWidth]);

  const getWindowSize = () => {
    setViewWidth(window.innerWidth);
  };


  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

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
        <span
          className="product-add-to-cart"
          onClick={() => updateCart(product)}
        >
          {isCartItem ? "Added To Cart" : "Add To Cart"}
        </span>
        <ProductLike
          product={product}
          style={{ position: "absolute", bottom: " 10px", right: "10px" }}
        ></ProductLike>
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
    </div>
  );
}

export default Product;
