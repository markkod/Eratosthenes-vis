import React, { useEffect } from "react";
import "../styles/NumberContainer.css";

function NumberContainer(props) {
  let containerClassName = "NumberContainer";

  useEffect(() => {
    const element = document.getElementById(`numberContainer-${props.number}`);

    if (props.colour && element) {
      element.style.backgroundColor = props.colour;
    }
<<<<<<< HEAD

    if (props.isMarked) {
        containerClassName = "MarkedNumberContainer"
    }
 
    return (
        <div className={containerClassName}>
            <h4 className="NumberText" >
                {props.number}
            </h4>
        </div>
    )
=======
  });

  return (
    <div
      id={`numberContainer-${props.number}`}
      className={containerClassName}
    >
      <h4 className="NumberText">{props.number}</h4>
    </div>
  );
>>>>>>> d0f53f52076fcfec6d4cce6f81e762bf6303da2a
}

export default NumberContainer;
