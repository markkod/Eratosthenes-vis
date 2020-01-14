import React from 'react'
import "../styles/NumberContainer.css"

function NumberContainer(props) {
    let containerClassName = "NumberContainer"

    if (props.isPrime) {
        containerClassName = "ColoredNumberContainer"
    }

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
}

export default NumberContainer;