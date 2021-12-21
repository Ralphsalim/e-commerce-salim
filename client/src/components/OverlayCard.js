import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteoverlay } from "./../actions";

//receives compenents and displays them as a card
//relies on overlay, overlay dictates which compenent to render
//check overlay in store
function OverlayCard(props) {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay);
  const { components } = props;

  const handleClick = () => {
    dispatch(deleteoverlay());
  };
  return (
    <div className="overlay">
      <div
        className="overlay-wrapper"
        style={
          overlay === "ACCOUNT" ? { height: "500px", width: "500px" } : null
        }
      >
        <span className="overlay-close" onClick={handleClick}>
          x
        </span>
        {components[overlay]}
      </div>
    </div>
  );
}

export default OverlayCard;
