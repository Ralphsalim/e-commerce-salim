import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  const linkStyles = {
    marginTop: "10px",
    color: "black",
    fontSize: "20px",
  };

  const divstyles = {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    width: "300px",
  };

  const headingstyles = {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  };
  return (
    <section
      style={{
        backgroundColor: "#F1F3F4",
        padding: "30px",
        minHeight: "300px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div style={divstyles}>
        <span style={headingstyles}>LINKS</span>
        <Link to="/" style={linkStyles}>
          Home
        </Link>
        <Link to="/register" style={linkStyles}>
          Register
        </Link>
        <Link to="/login" style={linkStyles}>
          Login{" "}
        </Link>
        <Link to="/mypage" style={linkStyles}>
          My Account
        </Link>
      </div>

      <div style={divstyles}>
        <span style={headingstyles}>SHOP</span>
        <Link to="/" style={linkStyles}>
          Home
        </Link>
        <Link to="/register" style={linkStyles}>
          Register
        </Link>
        <Link to="/login" style={linkStyles}>
          Login{" "}
        </Link>
        <Link to="/mypage" style={linkStyles}>
          My Account
        </Link>
      </div>

      <div style={divstyles}>
        <span style={headingstyles}>OUR PRESENCE </span>
        <Link to="" style={{ ...linkStyles, color: "blue" }}>
          <FacebookIcon />{" "}
        </Link>

        <Link to="" style={{ ...linkStyles, color: "#5DA9DD" }}>
          <TwitterIcon></TwitterIcon>
        </Link>

        <Link to="" style={{ ...linkStyles, color: "red" }}>
          <YouTubeIcon></YouTubeIcon>
        </Link>
      </div>
    </section>
  );
}

export default Footer;
