import React, { useEffect } from "react";
import "../styles/NumberContainer.css";

function NumberContainer(props) {
  let containerClassName = "NumberContainer";

  useEffect(() => {
    const element = document.getElementById(`numberContainer-${props.number}-${props.colour}`);

    if (props.colour && element) {
      element.style.backgroundColor = props.colour;
    }
  });

  if (props.isPrime) {
    containerClassName = "NumberContainer NumberContainerIsPrime";
  }

  return (
    <div id={`numberContainer-${props.number}-${props.colour}`} className={containerClassName}>
      <h4 className="NumberText">{props.number}</h4>
    </div>
  );
}

export default NumberContainer;
