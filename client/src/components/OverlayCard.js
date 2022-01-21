import { InstallMobile } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteoverlay } from "./../actions";
import CloseIcon from "@mui/icons-material/Close";

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
  const [viewheight, setViewheight] = useState(window.innerHeight - 60);
  const [isMobile, setisMobile] = useState(false);

  const setWidth = () => {
    setViewheight(window.innerHeight);
    setviewWidth(window.innerWidth);
  };
  useEffect(() => {
    if (window.innerWidth <= 480) {
      setisMobile(true);
    }

    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);
  return (
    <div
      className="overlay"
      style={{ height: viewheight  + "px", backgroundColor:'whitesmoke'}}
    >
      <div
        className="overlay-wrapper"
        style={
          overlay === "ACCOUNT"
            ? {
                display: "flex",
                justifyContent: "center",
            
              }
            : null
        }
      >
        <span className="overlay-close" onClick={handleClick}>
          <CloseIcon></CloseIcon>
        </span>
        {components[overlay]}
      </div>
    </div>
  );
}

export default OverlayCard;
