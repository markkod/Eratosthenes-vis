import React from 'react'
import "../styles/NumberContainer.css"

function NumberConatiner(props) {
    let containerClassName = "NumberContainer"

    if (props.isPrime) {
        containerClassName = "ColoredNumberContainer"
    }
 
    return (
        <div className={containerClassName}>
            <h4 className="NumberText" >
                {props.number}
            </h4>
        </div>
    )
}

export default NumberConatiner;