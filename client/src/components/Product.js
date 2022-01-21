import React, { useRef, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  addcartitem,
  addfavourite,
  deletecartitem,
  deletefavorite,
  initializecarttotals,
  setsuccessmessage,
} from "../actions";

import ProductLike from "./ProductLike";
import SuccessMessage from "./SuccessMessage";

//favrites functionality

/*
click on favorite button 
item added to favorites in state 
update count on the favorites icon 

*/

function Product(props) {
  const dispatch = useDispatch();
  const { product, productVariant, page } = props;
  const productRef = useRef(null);
  const [productHeight, setproductHeight] = useState(0);

  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  const [isFavorited, setisFavorited] = useState(false);
  const [isCartItem, setisCartItem] = useState(false);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  const [isChoosingSize, setisChoosingSize] = useState(false);
  const [size, setSize] = useState("");

  const [successMessage, setsuccessMessage] = useState("");

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
    if (cart[productVariant.variantId]) setisCartItem(true);
    else setisCartItem(false);
  }, [cart[productVariant._id]]);

  useEffect(() => {
    if (favorites[productVariant.variantId]) setisFavorited(true);
    else setisFavorited(false);
  }, [favorites[productVariant.variantId]]);

  //
  const updateCart = (productvariant, selectedSize) => {
    if (!selectedSize) {
      setisChoosingSize(true);
      return;
    } else {
      setisChoosingSize(false);

      //check if item is in cart
      const variantId = productvariant.variantId + "-" + selectedSize;
      if (cart[variantId]) {
        dispatch(setsuccessmessage("Product Already Exists"));
        return;
      } else {
        const update = { ...productVariant, size: selectedSize, variantId };
        dispatch(addcartitem(update));
        dispatch(
          initializecarttotals({
            price: productvariant.price,
            id: productvariant._id,
            variantId,
            color: productvariant.color,
            size: selectedSize,
          })
        );
        dispatch(setsuccessmessage("Product Added"));
      }
    }
    // }
  };

  const handleChange = (e, productVariant) => {
    e.preventDefault();
    setSize(e.target.value);
    const selectedSize = e.target.value;
    updateCart(productVariant, selectedSize);
  };

  return (
    <div className="product" ref={productRef}>
      <div className="product-img">
        {isChoosingSize ? (
          <select
            name="size"
            id="size"
            value={size}
            onChange={(e) => handleChange(e, productVariant)}
            className="product-select"
            style={{
              position: "absolute",
              bottom: "50%",
              width: "100%",
              margin: "0px aut0 0px auto",
            }}
          >
            <option> Choose Size </option>
            {productVariant.sizes.map((size) => {
              return (
                <option value={size.size} key={size.size}>
                  {size.size}
                </option>
              );
            })}
          </select>
        ) : null}

        {page === "favorites"
          ? !isChoosingSize && (
              <span
                className="product-add-to-cart"
                onClick={() => updateCart(productVariant)}
              >
                Add To Cart
              </span>
            )
          : null}

        <ProductLike
          productVariant={productVariant}
          style={{ position: "absolute", bottom: " 10px", right: "10px" }}
        ></ProductLike>
        <Link
          to={`/${productVariant._id}`}
          state={{
            product,
            color: productVariant.color,
            productVariant: productVariant,
          }}
        >
          <img
            src={productVariant.image}
            alt=""
            style={{ height: productHeight + "px", width: "100%" }}
          />
        </Link>
      </div>
      <div className="product-info">
        <span>{productVariant.name}</span>
        <span>{productVariant.price} :- </span> <br />
        {page === "products" ? (
          <span
            style={{
              display: "flex",
              margin: "0px 5px 0px 0px",
            }}
          >
            {productVariant.colorOptions.map((color, key) => (
              <div
                style={{
                  backgroundColor: color,
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  margin: "0px 5px 0px 0px",
                  border: "0.4px solid black",
                }}
                key={color + key}
              ></div>
            ))}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default Product;
