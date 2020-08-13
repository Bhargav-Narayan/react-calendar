import React, { useState } from "react";

const InputBox = () => {

    const [userInput, updateUserInput] = useState()

    const handleChange = (e) => {
        const value = e.target.value;

        const regExpression = new RegExp(/^-?\d+\.?\d*$/)
        if (regExpression.test(value)) {
            console.log("Valid number input")
            updateUserInput(value)
        } else {
            console.log("Invalid number input");
        }



    }

    const handleKeyDown = (e) => {
        console.log(e.key)
    }

    return (
        <input type="text" value={userInput} onChange={handleChange} onKeyDown={handleKeyDown} />
    )
}

export default InputBox