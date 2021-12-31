import React from "react";

function Collapsable(props) {
  const { component, header, controller, next } = props;

  const handleClick = () => {
    console.log("clicked");
  };
  console.log(controller.isCurrent);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  return (
    <section onClick={handleClick}>
      <header>{header}</header>
      {controller.isCurrent === "true" ? (
        <form onSubmit={handleSubmit}>
          {component}
          <button>Submit</button>
        </form>
      ) : null}
    </section>
  );
}

export default Collapsable;
