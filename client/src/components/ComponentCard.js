import { Link } from "react-router-dom";

export const ComponentCard = (props) => {
  const { link, text, component, style, reverse } = props;
  let reverseOrder = reverse || false;

  let styles = {
    display: "flex",
    justifyContent: " center",
    alignItems: "center",
    flex: "1",
    marginLeft: "20px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    height: "60px",
    maxWidth: "300px",
  };
  styles = { ...styles, ...style };

  return (
    <section style={styles} onClick={props.onClick}>
      {link ? (
        <Link
          to={link}
          style={{ display: "flex", color: "white", textDecoration: "none" }}
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
