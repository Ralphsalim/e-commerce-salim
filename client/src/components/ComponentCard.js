import { Link, useNavigate } from "react-router-dom";

export const ComponentCard = (props) => {
  const { link, text, component, style, reverse, onClick, state } = props;
  let reverseOrder = reverse || false;

  let styles = {
    display: "flex",
    justifyContent: " center",
    alignItems: "center",
    backgroundColor: "#202122",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    height: "60px",
  };
  styles = { ...styles, ...style };

  return (
    <section style={styles} onClick={onClick}>
      {link ? (
        <Link
          to={link}
          state={state ? state : {}}
          style={{
            display: "flex",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {reverseOrder ? text : null} {component}
          {reverseOrder ? null : text}
        </Link>
      ) : null}

      {!link && reverseOrder && text}
      {!link && component}
      {!link && !reverseOrder && text}
    </section>
  );
};
