import React,{useEffect, useState} from "react";
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
  const [viewWidth, setviewWidth] = useState(window.innerWidth);
  const [viewheight, setViewheight] = useState(window.innerHeight-60);

  const setWidth = () => {
    setViewheight(window.innerHeight);
    setviewWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);
  return (
    <div className="overlay" style={{height:viewheight+'px'}}>
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
