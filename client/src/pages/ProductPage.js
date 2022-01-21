import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  addcartitem,
  deleteoverlay,
  initializecarttotals,
  setsuccessmessage,
} from "../actions";
import CartItems, { TextValue } from "../components/CartItems";
import FavoriteItems from "../components/FavoriteItems";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import OverlayCard from "../components/OverlayCard";
import ProductLike from "../components/ProductLike";
import productsreducer from "../reducers/productsReducer";

function ProductPage(props) {
  let { pathname, state } = useLocation();
  const dispatch = useDispatch();
  const { product, color, productVariant } = state;

  const [selectedImages, setselectedImages] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedColor, setSelectedColor] = useState(color);
  const [variant, setVariant] = useState(null);
  const [priceOfvariant, setPriceOfvariant] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");
  const cart = useSelector((state) => state.cart);
  const overlay = useSelector((state) => state.overlay);
  const statusMessages = useSelector((state) => state.statusMessages);

  const [successMessage, setsuccessMessage] = useState("");

  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  const [favoriteVariant, setfavoriteVariant] = useState({}); //the product that will be added to

  const setSize = () => {
    setViewWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  //set overly to false to remove overly component when the page loalds
  useEffect(() => {
    dispatch(deleteoverlay());
  }, []);

  //returns the product variant that was seleced based on color
  function getVariant(color) {
    const variants = product.variants;
    let result;
    for (const el of variants) {
      if (el.color === color) {
        result = el;
      }
    }
    return result;
  }

  //
  const handleClick = (color) => {
    let rawcolor = color;
    setSelectedColor(color); //set the color
    const variant = getVariant(color);
    setPriceOfvariant();
    setselectedImages(variant.images); //sets the appropriate images to be displayed

    //sets the size options to be displayed
    setSizeOptions(() => {
      let sizes = [];
      variant.sizes.forEach((size) => {
        if (size.qty) {
          sizes.push(size);
        }
      });

      return sizes;
    });

    //sets the product variant that will be added to cart
    setfavoriteVariant(() => {
      const productVariant = {
        name: product.name,
        color: color,
        _id: product._id,
        image: variant.images[0],
        variantId: product._id + "-" + color,
        price: 99,
        sizes: variant.sizes,
      };

      return productVariant;
    });
  };

  //sets the defaults when the page loads
  //will rerender when the product chenges

  useEffect(() => {
    handleClick(color);
    dispatch(deleteoverlay());
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      setErrorMessage("Choose a Size First");
      return;
    }

    const cartproduct = {
      name: product.name,
      price: priceOfvariant,
      _id: product._id,
      variantId: product._id + "-" + selectedColor + "-" + selectedSize,
      color: selectedColor,
      size: selectedSize,
      image: selectedImages[0],
      sizes: sizeOptions,
    };

    //check if the product does exist in the cartx
    //if it is, show user that the product was already added
    if (cart[cartproduct.variantId]) {
      setErrorMessage("Product Already In Cart");
      return;
    }

    dispatch(addcartitem(cartproduct)); //adds the product to the cart
    dispatch(
      initializecarttotals({
        price: cartproduct.price,
        variantId: cartproduct.variantId,
        id: cartproduct._id,
        color: cartproduct.color,
        size: cartproduct.size,
      }) //adds the product to totals to calculate the totals
    );

    dispatch(setsuccessmessage("Product Added"));
  };

  //ssts the size of the variant
  //sets the right price of the variant
  const handleChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    const price = getPrice(size);
    setPriceOfvariant(price);
  };

  //returns the price of a given size
  const getPrice = (size) => {
    let price;
    console.log(size);
    for (const el of sizeOptions) {
      console.log(el);
      if (el.size === size) {
        price = el.price;
        break;
      }
    }

    return price;
  };

  //makes the message dissapear after some time
  //the message will clear after 5 seconds
  useEffect(() => {
    let timeOut;

    if (errorMessage) {
      timeOut = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    return () => clearTimeout(timeOut);
  }, [errorMessage]);

  return (
    <div
      style={{
        overflowY: overlay ? "hidden" : "scroll",
        height: overlay ? "100vh" : "",
        marginTop: overlay ? "0px" : "",
      }}
    >
      <Navbar></Navbar>
      <section
        style={{
          display: "flex",
          marginTop: "80px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        className="productpage-main"
      >
        {/* <SuccessMessage></SuccessMessage> */}
        <div className="productpage-left">
          {selectedImages.map((image, index) => {
            return (
              <>
                {index === 1 && viewWidth <= 768 ? (
                  <div className="productpage-right">
                    <form action="" className="productpage-form">
                      <ProductLike
                        productVariant={favoriteVariant}
                        style={{
                          position: "absolute",
                          top: " 30px",
                          right: "30px",
                        }}
                      ></ProductLike>

                      <section className="productpage-form-info">
                        <span>
                          {priceOfvariant ? `${priceOfvariant} :-` : ""}
                        </span>
                        <span>{selectedColor}</span>
                        <span>{product.name}</span>
                      </section>

                      <section className="productpage-form-image">
                        {product.variants.map((variant) => {
                          const border =
                            selectedColor === variant.color
                              ? "1px solid black"
                              : "";
                          return (
                            <img
                              src={variant.images[0]}
                              alt=""
                              key={variant.color}
                              style={{
                                border: border,
                              }}
                              onClick={() => handleClick(variant.color)}
                            />
                          );
                        })}
                      </section>

                      <section className="productpage-form-bottom">
                        <select
                          name="size-options"
                          onChange={(e) => handleChange(e)}
                          value={selectedSize}
                        >
                          <option value="">Choose A Size </option>
                          {sizeOptions.map((el) => {
                            return (
                              <option value={el.size} key={el.size}>
                                {el.size}
                              </option>
                            );
                          })}
                        </select>
                        <br />

                        <button
                          onClick={(e) => handleSubmit(e)}
                          style={{ backgroundColor: "#202122", color: "white" }}
                        >
                          Add To Cart
                        </button>
                      </section>
                    </form>
                  </div>
                ) : (
                  ""
                )}
                <img
                  src={image}
                  alt=""
                  key={index}
                  style={{ marginBottom: "10px" }}
                />
              </>
            );
          })}
        </div>
        {viewWidth >= 768 ? (
          <div className="productpage-right">
            <form action="" className="productpage-form">
              <ProductLike
                product={product}
                productVariant={favoriteVariant}
                style={{ position: "absolute", top: " 30px", right: "30px" }}
              ></ProductLike>

              <section className="productpage-form-info">
                <span>{priceOfvariant ? `${priceOfvariant} :-` : ""}</span>
                <span>{selectedColor}</span>
                <span>{product.name}</span>
              </section>

              <section className="productpage-form-image">
                {product.variants.map((variant) => {
                  const border =
                    selectedColor === variant.color ? "0.5px solid black" : "";
                  return (
                    <img
                      src={variant.images[0]}
                      alt=""
                      key={variant.color}
                      style={{
                        border: border,
                      }}
                      onClick={() => handleClick(variant.color)}
                    />
                  );
                })}
              </section>

              <section className="productpage-form-bottom">
                <select
                  name="size-options"
                  onChange={(e) => handleChange(e)}
                  value={selectedSize}
                >
                  <option value="">Choose A Size </option>
                  {sizeOptions.map((el) => {
                    return (
                      <option value={el.size} key={el.size}>
                        {el.size}
                      </option>
                    );
                  })}
                </select>
                <br />

                <div
                  style={{
                    color: "red",
                    marginBottom: "30px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {errorMessage && <span>{errorMessage}</span>}
                </div>

                <button
                  onClick={(e) => handleSubmit(e)}
                  style={{ backgroundColor: "#202122", color: "white" }}
                >
                Add To Cart
                </button>
              </section>
            </form>
          </div>
        ) : (
          ""
        )}
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
    </div>
  );
}

export default ProductPage;
