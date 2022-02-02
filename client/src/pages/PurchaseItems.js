import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setpurchases } from "../actions";
import PurchaseItem from "./PurchaseItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function PurchaseItems(props) {
  const purchases = useSelector((state) => state.purchases);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const [fullView, setFullView] = useState({});

  useEffect(() => {
    axios.get("/api/v1/orders?id=" + userId).then((res) => {
      dispatch(setpurchases(res.data.data));
    });
  }, []);

  //toggle full view
  //toggle height
  const handleClick = (id) => {
    console.log(id);
    if (fullView[id] === true) {
      setFullView((prev) => {
        return { ...prev, [id]: false };
      });
    } else {
      setFullView((prev) => {
        return { ...prev, [id]: true };
      });
    }
  };

  return (
    <div>
      {purchases.length ? (
        purchases.map((purchase) => {
          return (
            <section
              style={{
                padding: "20px 10px 20px 10px",
                border: "1px solid black",
                margin: "10px 0px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "5px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Order ID: </span>
                <span> {purchase._id}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "5px",
                }}
              >
                <span style={{ fontWeight: "bold" }}> Delivery Adress: </span>
                <span>
                  {" "}
                  {purchase.billingInfo.street +
                    ", " +
                    purchase.billingInfo.city}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "5px",
                }}
              >
                <span style={{ fontWeight: "bold" }}> Date Created: </span>
                <span>{purchase.created_at}</span>
              </div>

              {fullView[purchase._id] &&
                purchase.productsInfo.map((product) => {
                  return <PurchaseItem product={product}></PurchaseItem>;
                })}

              <div
                style={{ position: "absolute", bottom: "0px", right: "50%" }}
                onClick={() => handleClick(purchase._id)}
              >
                {fullView[purchase._id] ? (
                  <ArrowDropUpIcon sx={{ fontSize: "25px" }}></ArrowDropUpIcon>
                ) : (
                  <ArrowDropDownIcon></ArrowDropDownIcon>
                )}
              </div>
            </section>
          );
        })
      ) : (
        <div style={{ padding: "20px", textAlign: "center", margin: "10px" }}>
          No Previous Purchases{" "}
        </div>
      )}
    </div>
  );
}

export default PurchaseItems;
