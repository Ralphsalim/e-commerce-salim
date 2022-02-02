import React from "react";
import { Link } from "react-router-dom";

function CategoryCard(props) {
  const { name, to, state, img } = props;
  return (
    <Link to={to} state={state ? state : {}}>
      <section
        style={{
          height: "350px",
          width: "300px",
          color: "red",
          overflow: "hidden",
          border: "1px solid whitesmoke",
          padding: "30px 10px 10px 10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "10px 0px 10px 0px",
          textDecoration: "none",
          color: "black",
          backgroundColor: "white",
        }}
      >
        <img
          src={img}
          alt="image"
          style={{ height: "280px", width: "280px", borderRadius: "100%" }}
        />
        <span style={{ paddingTop: "20px", textDecoration: "none" }}>
          {name}
        </span>
      </section>
    </Link>
  );
}

export default CategoryCard;
