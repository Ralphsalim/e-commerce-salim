import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import { useEffect } from "react";

function SuccessMessage(props) {
  let { message, style } = props;

  //   const [text, setText] = useState(message);

  //   useEffect(() => {
  //     console.log("seeting text, message ");
  //     setText(message);
  //   }, []);

  //   const intervalFunction = () => {
  //     setText("");
  //     console.log("text ");
  //   };

  //   useEffect(() => {
  //     setTimeout(intervalFunction, 3000);
  //     return clearInterval(intervalFunction);
  //   }, [text]);

  return (
    <>
      {message && (
        <div
          style={{
            display: "flex",
            backgroundColor: "#2DD284",
            height: "30px",
            padding: "5px 20px 5px 20px",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...style,
          }}
        >
          <span>{message}</span>
          <CheckCircleOutlineIcon
            sx={{ color: "white", marginLeft: "10px" }}
          ></CheckCircleOutlineIcon>
        </div>
      )}
    </>
  );
}

export default SuccessMessage;
