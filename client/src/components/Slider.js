import React from "react";
import slider from '../images/slider.jpg'

function Slider(props) {
  const { children } = props;

  return (
    <section
      style={{
        height: "75vh",
        backgroundColor: "grey",
        width: "100vw",
        maxHeight: "800px",
        position: "relative",
      }}
    >
      <img
        src={slider}
        alt=""
        style={{
          height: "100%",
          width: "100%",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          backgroundSize: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default Slider;
