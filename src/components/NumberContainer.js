import React, { useEffect } from "react";
import "../styles/NumberContainer.css";

function NumberContainer(props) {
  let containerClassName = "NumberContainer";

  useEffect(() => {
    const element = document.getElementById(`numberContainer-${props.number}`);

    if (props.colour && element) {
      element.style.backgroundColor = props.colour;
    }
  });

  return (
    <div
      id={`numberContainer-${props.number}`}
      className={containerClassName}
    >
      <h4 className="NumberText">{props.number}</h4>
    </div>
  );
}

export default NumberContainer;
